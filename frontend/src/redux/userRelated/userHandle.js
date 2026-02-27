import { supabase } from '../../supabaseClient';
import {
    authRequest,
    stuffAdded,
    authSuccess,
    authFailed,
    authError,
    authLogout,
    setAuthLoading,
    doneSuccess,
    getRequest,
    getFailed,
    getError,
} from './userSlice';

// ─── Load user profile from role tables by auth_id ───
const loadUserProfile = async (authUserId) => {
    // Try admin
    const { data: admin } = await supabase
        .from('admins')
        .select('*')
        .eq('auth_id', authUserId)
        .single();
    if (admin) {
        return { ...admin, role: 'Admin' };
    }

    // Try teacher
    const { data: teacher } = await supabase
        .from('teachers')
        .select('*, subjects:teach_subject_id(id, sub_name, sessions), admins:school_id(id, school_name), classes:teach_class_id(id, class_name)')
        .eq('auth_id', authUserId)
        .single();
    if (teacher) {
        const user = {
            ...teacher,
            role: 'Teacher',
            teachSubject: teacher.subjects,
            school: teacher.admins,
            teachSclass: teacher.classes,
        };
        delete user.subjects;
        delete user.admins;
        delete user.classes;
        return user;
    }

    // Try student
    const { data: student } = await supabase
        .from('students')
        .select('*, classes:class_id(id, class_name), admins:school_id(id, school_name)')
        .eq('auth_id', authUserId)
        .single();
    if (student) {
        const user = {
            ...student,
            role: 'Student',
            sclassName: student.classes,
            school: student.admins,
        };
        delete user.classes;
        delete user.admins;
        return user;
    }

    return null;
};

// ─── Initialize auth on app mount ───
export const initializeAuth = () => async (dispatch) => {
    try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
            const profile = await loadUserProfile(session.user.id);
            if (profile) {
                dispatch(authSuccess(profile));
            }
        }
    } catch (error) {
        console.error('Auth initialization error:', error);
    } finally {
        dispatch(setAuthLoading(false));
    }

    // Listen for auth state changes (token refresh, sign out, etc.)
    supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_OUT') {
            dispatch(authLogout());
        } else if (event === 'TOKEN_REFRESHED' && session?.user) {
            const profile = await loadUserProfile(session.user.id);
            if (profile) {
                dispatch(authSuccess(profile));
            }
        }
    });
};

// ─── Login ───
export const loginUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());
    try {
        let email = fields.email;

        // For students, resolve roll_num + name to email via RPC
        if (role === "Student") {
            const { data: studentEmail, error: rpcError } = await supabase
                .rpc('get_student_email', {
                    p_roll_num: parseInt(fields.rollNum),
                    p_name: fields.studentName,
                });

            if (rpcError || !studentEmail) {
                dispatch(authFailed("Student not found. Check your roll number and name."));
                return;
            }
            email = studentEmail;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password: fields.password,
        });

        if (error) {
            dispatch(authFailed(error.message === 'Invalid login credentials'
                ? "Invalid email or password"
                : error.message));
            return;
        }

        const profile = await loadUserProfile(data.user.id);
        if (!profile) {
            dispatch(authFailed("User profile not found. Contact your administrator."));
            await supabase.auth.signOut();
            return;
        }

        if (profile.role !== role) {
            dispatch(authFailed(`This account is registered as ${profile.role}, not ${role}.`));
            await supabase.auth.signOut();
            return;
        }

        dispatch(authSuccess(profile));
    } catch (error) {
        dispatch(authError(error));
    }
};

// ─── Register (Admin only from frontend; Student/Teacher via edge function) ───
export const registerUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());
    try {
        if (role === "Admin") {
            // Check school name uniqueness via RPC
            const { data: schoolExists } = await supabase
                .rpc('check_school_exists', { p_school_name: fields.schoolName });
            if (schoolExists) {
                dispatch(authFailed("School name already exists"));
                return;
            }

            // Sign up via Supabase Auth
            const { data: authData, error: authErr } = await supabase.auth.signUp({
                email: fields.email,
                password: fields.password,
                options: {
                    data: { role: 'Admin', name: fields.name },
                },
            });

            if (authErr) {
                dispatch(authFailed(authErr.message));
                return;
            }

            // Insert admin row
            const { data: adminRecord, error: insertErr } = await supabase
                .from('admins')
                .insert({
                    auth_id: authData.user.id,
                    name: fields.name,
                    email: fields.email,
                    school_name: fields.schoolName,
                    role: 'Admin',
                })
                .select()
                .single();

            if (insertErr) {
                dispatch(authFailed(insertErr.message));
                return;
            }

            dispatch(authSuccess({ ...adminRecord, role: 'Admin' }));

        } else if (role === "Student") {
            // Generate email for student
            const adminID = fields.adminID;
            const rollNum = fields.rollNum;

            // Get school prefix for email generation
            const { data: adminData } = await supabase
                .from('admins')
                .select('school_name')
                .eq('id', adminID)
                .single();

            const schoolPrefix = (adminData?.school_name || 'school')
                .toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 10);
            const studentEmail = `s${rollNum}.${schoolPrefix}@school.local`;

            // Call edge function
            const { data: { session } } = await supabase.auth.getSession();
            const response = await fetch(
                `${process.env.REACT_APP_SUPABASE_URL}/functions/v1/create-school-user`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${session.access_token}`,
                    },
                    body: JSON.stringify({
                        role: 'Student',
                        name: fields.name,
                        email: studentEmail,
                        password: fields.password,
                        rollNum: parseInt(fields.rollNum),
                        classId: fields.sclassName,
                        schoolId: adminID,
                    }),
                }
            );

            const result = await response.json();
            if (!response.ok) {
                dispatch(authFailed(result.error || "Failed to create student"));
                return;
            }
            dispatch(stuffAdded(result));

        } else if (role === "Teacher") {
            // Call edge function
            const { data: { session } } = await supabase.auth.getSession();
            const response = await fetch(
                `${process.env.REACT_APP_SUPABASE_URL}/functions/v1/create-school-user`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${session.access_token}`,
                    },
                    body: JSON.stringify({
                        role: 'Teacher',
                        name: fields.name,
                        email: fields.email,
                        password: fields.password,
                        schoolId: fields.school,
                        teachSubjectId: fields.teachSubject,
                        teachClassId: fields.teachSclass,
                    }),
                }
            );

            const result = await response.json();
            if (!response.ok) {
                dispatch(authFailed(result.error || "Failed to create teacher"));
                return;
            }

            // Update subject with teacher reference
            if (fields.teachSubject) {
                await supabase
                    .from('subjects')
                    .update({ teacher_id: result.id })
                    .eq('id', fields.teachSubject);
            }

            dispatch(stuffAdded(result));
        }
    } catch (error) {
        dispatch(authError(error));
    }
};

// ─── Logout ───
export const logoutUser = () => async (dispatch) => {
    try {
        await supabase.auth.signOut();
        dispatch(authLogout());
    } catch (error) {
        dispatch(authLogout());
    }
};

// ─── Get user details ───
export const getUserDetails = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    try {
        if (address === "Student") {
            const { data: student, error } = await supabase
                .from('students')
                .select('*, classes:class_id(id, class_name), admins:school_id(id, school_name)')
                .eq('id', id)
                .single();
            if (error || !student) {
                dispatch(getError("No student found"));
                return;
            }
            const { data: examResults } = await supabase
                .from('student_exam_results')
                .select('*, subjects:subject_id(id, sub_name)')
                .eq('student_id', id);
            const { data: attendance } = await supabase
                .from('student_attendance')
                .select('*, subjects:subject_id(id, sub_name, sessions)')
                .eq('student_id', id);
            const result = {
                ...student,
                sclassName: student.classes,
                school: student.admins,
                examResult: (examResults || []).map(r => ({
                    _id: r.id,
                    id: r.id,
                    subName: r.subjects,
                    marksObtained: r.marks_obtained,
                })),
                attendance: (attendance || []).map(a => ({
                    _id: a.id,
                    id: a.id,
                    date: a.date,
                    status: a.status,
                    subName: a.subjects,
                })),
            };
            delete result.classes;
            delete result.admins;
            dispatch(doneSuccess(result));
        } else if (address === "Teacher") {
            const { data: teacher, error } = await supabase
                .from('teachers')
                .select('*, subjects:teach_subject_id(id, sub_name, sessions), admins:school_id(id, school_name), classes:teach_class_id(id, class_name)')
                .eq('id', id)
                .single();
            if (error || !teacher) {
                dispatch(getError("No teacher found"));
                return;
            }
            const { data: attendance } = await supabase
                .from('teacher_attendance')
                .select('*')
                .eq('teacher_id', id);
            const result = {
                ...teacher,
                teachSubject: teacher.subjects,
                school: teacher.admins,
                teachSclass: teacher.classes,
                attendance: (attendance || []).map(a => ({
                    _id: a.id,
                    id: a.id,
                    date: a.date,
                    presentCount: a.present_count,
                    absentCount: a.absent_count,
                })),
            };
            delete result.subjects;
            delete result.admins;
            delete result.classes;
            dispatch(doneSuccess(result));
        } else if (address === "Admin") {
            const { data, error } = await supabase
                .from('admins')
                .select('*')
                .eq('id', id)
                .single();
            if (error || !data) {
                dispatch(getError("No admin found"));
                return;
            }
            dispatch(doneSuccess({ ...data, role: 'Admin' }));
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

// ─── Delete user ───
export const deleteUser = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    dispatch(getFailed("Sorry the delete function has been disabled for now."));
};

// ─── Update user ───
export const updateUser = (fields, id, address) => async (dispatch) => {
    dispatch(getRequest());
    try {
        // Handle password change via Supabase Auth
        if (fields.password) {
            const { error: pwError } = await supabase.auth.updateUser({
                password: fields.password,
            });
            if (pwError) {
                dispatch(getError(pwError.message));
                return;
            }
        }

        if (address === "Student") {
            const updates = {};
            if (fields.name) updates.name = fields.name;
            if (fields.rollNum) updates.roll_num = fields.rollNum;
            const { data, error } = await supabase
                .from('students')
                .update(updates)
                .eq('id', id)
                .select()
                .single();
            if (error) throw error;
            dispatch(doneSuccess(data));
        } else if (address === "Teacher") {
            const updates = {};
            if (fields.name) updates.name = fields.name;
            if (fields.email) updates.email = fields.email;
            const { data, error } = await supabase
                .from('teachers')
                .update(updates)
                .eq('id', id)
                .select()
                .single();
            if (error) throw error;
            dispatch(doneSuccess(data));
        } else if (address === "Admin") {
            const updates = {};
            if (fields.name) updates.name = fields.name;
            if (fields.email) updates.email = fields.email;
            if (fields.schoolName) updates.school_name = fields.schoolName;
            const { data, error } = await supabase
                .from('admins')
                .update(updates)
                .eq('id', id)
                .select()
                .single();
            if (error) throw error;
            if (data.school_name) {
                dispatch(authSuccess({ ...data, role: 'Admin' }));
            } else {
                dispatch(doneSuccess(data));
            }
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

// ─── Add stuff (classes, subjects, notices, complains) ───
export const addStuff = (fields, address) => async (dispatch) => {
    dispatch(authRequest());
    try {
        if (address === "Sclass") {
            const { data: existing } = await supabase
                .from('classes')
                .select('id')
                .eq('class_name', fields.sclassName)
                .eq('school_id', fields.adminID)
                .single();
            if (existing) {
                dispatch(authFailed("Sorry this class name already exists"));
                return;
            }
            const { data, error } = await supabase
                .from('classes')
                .insert({
                    class_name: fields.sclassName,
                    school_id: fields.adminID,
                })
                .select()
                .single();
            if (error) {
                dispatch(authFailed(error.message));
                return;
            }
            dispatch(stuffAdded(data));
        } else if (address === "Subject") {
            const subjects = fields.subjects.map(s => ({
                sub_name: s.subName,
                sub_code: s.subCode,
                sessions: s.sessions,
                class_id: fields.sclassName,
                school_id: fields.adminID,
            }));
            const { data: existingCode } = await supabase
                .from('subjects')
                .select('id')
                .eq('sub_code', subjects[0].sub_code)
                .eq('school_id', fields.adminID)
                .single();
            if (existingCode) {
                dispatch(authFailed("Sorry this subcode must be unique as it already exists"));
                return;
            }
            const { data, error } = await supabase
                .from('subjects')
                .insert(subjects)
                .select();
            if (error) {
                dispatch(authFailed(error.message));
                return;
            }
            dispatch(stuffAdded(data));
        } else if (address === "Notice") {
            const { data, error } = await supabase
                .from('notices')
                .insert({
                    title: fields.title,
                    details: fields.details,
                    date: fields.date,
                    school_id: fields.adminID,
                })
                .select()
                .single();
            if (error) {
                dispatch(authFailed(error.message));
                return;
            }
            dispatch(stuffAdded(data));
        } else if (address === "Complain") {
            const { data, error } = await supabase
                .from('complains')
                .insert({
                    user_id: fields.user,
                    date: fields.date,
                    complaint: fields.complaint,
                    school_id: fields.school,
                })
                .select()
                .single();
            if (error) {
                dispatch(authFailed(error.message));
                return;
            }
            dispatch(stuffAdded(data));
        }
    } catch (error) {
        dispatch(authError(error));
    }
};

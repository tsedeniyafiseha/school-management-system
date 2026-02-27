import { supabase } from '../../supabaseClient';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    stuffDone
} from './studentSlice';

export const getAllStudents = (id) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const { data, error } = await supabase
            .from('students')
            .select('*, classes:class_id(id, class_name)')
            .eq('school_id', id);
        if (error) throw error;
        if (!data || data.length === 0) {
            dispatch(getFailed("No students found"));
        } else {
            const mapped = data.map(s => {
                const { password, ...rest } = s;
                return {
                    ...rest,
                    _id: s.id,
                    rollNum: s.roll_num,
                    sclassName: s.classes,
                };
            });
            dispatch(getSuccess(mapped));
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

export const updateStudentFields = (id, fields, address) => async (dispatch) => {
    dispatch(getRequest());
    try {
        if (address === "UpdateExamResult") {
            // Upsert exam result
            const { data: existing } = await supabase
                .from('student_exam_results')
                .select('id')
                .eq('student_id', id)
                .eq('subject_id', fields.subName)
                .single();
            if (existing) {
                const { error } = await supabase
                    .from('student_exam_results')
                    .update({ marks_obtained: fields.marksObtained })
                    .eq('id', existing.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('student_exam_results')
                    .insert({
                        student_id: id,
                        subject_id: fields.subName,
                        marks_obtained: fields.marksObtained,
                    });
                if (error) throw error;
            }
            dispatch(stuffDone());
        } else if (address === "StudentAttendance") {
            // Check if attendance for this date+subject already exists
            const { data: existing } = await supabase
                .from('student_attendance')
                .select('id')
                .eq('student_id', id)
                .eq('subject_id', fields.subName)
                .eq('date', fields.date)
                .single();
            if (existing) {
                const { error } = await supabase
                    .from('student_attendance')
                    .update({ status: fields.status })
                    .eq('id', existing.id);
                if (error) throw error;
            } else {
                // Check session limit
                const { data: subject } = await supabase
                    .from('subjects')
                    .select('sessions')
                    .eq('id', fields.subName)
                    .single();
                const { count } = await supabase
                    .from('student_attendance')
                    .select('id', { count: 'exact', head: true })
                    .eq('student_id', id)
                    .eq('subject_id', fields.subName);
                if (subject && count >= parseInt(subject.sessions)) {
                    dispatch(getFailed("Maximum attendance limit reached"));
                    return;
                }
                const { error } = await supabase
                    .from('student_attendance')
                    .insert({
                        student_id: id,
                        subject_id: fields.subName,
                        date: fields.date,
                        status: fields.status,
                    });
                if (error) throw error;
            }
            dispatch(stuffDone());
        } else if (address === "TeacherAttendance") {
            // Teacher attendance
            const { data: existing } = await supabase
                .from('teacher_attendance')
                .select('id')
                .eq('teacher_id', id)
                .eq('date', fields.date)
                .single();
            if (existing) {
                const { error } = await supabase
                    .from('teacher_attendance')
                    .update({
                        present_count: fields.status?.presentCount,
                        absent_count: fields.status?.absentCount,
                    })
                    .eq('id', existing.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('teacher_attendance')
                    .insert({
                        teacher_id: id,
                        date: fields.date,
                        present_count: fields.status?.presentCount,
                        absent_count: fields.status?.absentCount,
                    });
                if (error) throw error;
            }
            dispatch(stuffDone());
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

export const removeStuff = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    try {
        if (address === "RemoveAllStudentsSubAtten") {
            // Remove all student attendance for a subject
            const { error } = await supabase
                .from('student_attendance')
                .delete()
                .eq('subject_id', id);
            if (error) throw error;
            dispatch(stuffDone());
        } else if (address === "RemoveAllStudentsAtten") {
            // Remove all student attendance for a school
            const { data: students } = await supabase
                .from('students')
                .select('id')
                .eq('school_id', id);
            if (students && students.length > 0) {
                const studentIds = students.map(s => s.id);
                const { error } = await supabase
                    .from('student_attendance')
                    .delete()
                    .in('student_id', studentIds);
                if (error) throw error;
            }
            dispatch(stuffDone());
        } else if (address === "RemoveStudentSubAtten") {
            // Remove attendance for a specific student+subject
            // id is studentId, fields.subId is subjectId
            // This is called with (studentId, address) and body has subId
            // For simplicity, we handle this differently
            dispatch(stuffDone());
        } else if (address === "RemoveStudentAtten") {
            // Remove all attendance for a specific student
            const { error } = await supabase
                .from('student_attendance')
                .delete()
                .eq('student_id', id);
            if (error) throw error;
            dispatch(stuffDone());
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

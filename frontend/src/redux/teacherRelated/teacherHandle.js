import { supabase } from '../../supabaseClient';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    postDone,
    doneSuccess
} from './teacherSlice';

export const getAllTeachers = (id) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const { data, error } = await supabase
            .from('teachers')
            .select('*, subjects:teach_subject_id(id, sub_name), classes:teach_class_id(id, class_name)')
            .eq('school_id', id);
        if (error) throw error;
        if (!data || data.length === 0) {
            dispatch(getFailed("No teachers found"));
        } else {
            const mapped = data.map(t => {
                const { password, ...rest } = t;
                return {
                    ...rest,
                    _id: t.id,
                    teachSubject: t.subjects,
                    teachSclass: t.classes,
                };
            });
            dispatch(getSuccess(mapped));
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

export const getTeacherDetails = (id) => async (dispatch) => {
    dispatch(getRequest());
    try {
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
            _id: teacher.id,
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
        delete result.password;
        delete result.subjects;
        delete result.admins;
        delete result.classes;
        dispatch(doneSuccess(result));
    } catch (error) {
        dispatch(getError(error));
    }
};

export const updateTeachSubject = (teacherId, teachSubject) => async (dispatch) => {
    dispatch(getRequest());
    try {
        await supabase
            .from('teachers')
            .update({ teach_subject_id: teachSubject })
            .eq('id', teacherId);
        await supabase
            .from('subjects')
            .update({ teacher_id: teacherId })
            .eq('id', teachSubject);
        dispatch(postDone());
    } catch (error) {
        dispatch(getError(error));
    }
};

import { supabase } from '../../supabaseClient';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    getStudentsSuccess,
    detailsSuccess,
    getFailedTwo,
    getSubjectsSuccess,
    getSubDetailsSuccess,
    getSubDetailsRequest
} from './sclassSlice';

export const getAllSclasses = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    try {
        if (address === "Sclass") {
            const { data, error } = await supabase
                .from('classes')
                .select('*')
                .eq('school_id', id);
            if (error) throw error;
            if (!data || data.length === 0) {
                dispatch(getFailedTwo("No sclasses found"));
            } else {
                // Map to expected shape
                const mapped = data.map(c => ({
                    ...c,
                    _id: c.id,
                    sclassName: c.class_name,
                }));
                dispatch(getSuccess(mapped));
            }
        } else if (address === "AllSubjects") {
            const { data, error } = await supabase
                .from('subjects')
                .select('*, classes:class_id(id, class_name)')
                .eq('school_id', id);
            if (error) throw error;
            if (!data || data.length === 0) {
                dispatch(getFailedTwo("No subjects found"));
            } else {
                const mapped = data.map(s => ({
                    ...s,
                    _id: s.id,
                    subName: s.sub_name,
                    subCode: s.sub_code,
                    sclassName: s.classes,
                }));
                dispatch(getSuccess(mapped));
            }
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

export const getClassStudents = (id) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const { data, error } = await supabase
            .from('students')
            .select('*')
            .eq('class_id', id);
        if (error) throw error;
        if (!data || data.length === 0) {
            dispatch(getFailedTwo("No students found"));
        } else {
            const mapped = data.map(s => {
                const { password, ...rest } = s;
                return { ...rest, _id: s.id, rollNum: s.roll_num };
            });
            dispatch(getStudentsSuccess(mapped));
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

export const getClassDetails = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    try {
        if (address === "Sclass") {
            const { data, error } = await supabase
                .from('classes')
                .select('*, admins:school_id(id, school_name)')
                .eq('id', id)
                .single();
            if (error) throw error;
            const result = {
                ...data,
                _id: data.id,
                sclassName: data.class_name,
                school: data.admins,
            };
            delete result.admins;
            dispatch(detailsSuccess(result));
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

export const getSubjectList = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    try {
        if (address === "ClassSubjects") {
            const { data, error } = await supabase
                .from('subjects')
                .select('*')
                .eq('class_id', id);
            if (error) throw error;
            if (!data || data.length === 0) {
                dispatch(getFailed("No subjects found"));
            } else {
                const mapped = data.map(s => ({
                    ...s,
                    _id: s.id,
                    subName: s.sub_name,
                    subCode: s.sub_code,
                }));
                dispatch(getSubjectsSuccess(mapped));
            }
        } else if (address === "AllSubjects") {
            const { data, error } = await supabase
                .from('subjects')
                .select('*, classes:class_id(id, class_name)')
                .eq('school_id', id);
            if (error) throw error;
            if (!data || data.length === 0) {
                dispatch(getFailed("No subjects found"));
            } else {
                const mapped = data.map(s => ({
                    ...s,
                    _id: s.id,
                    subName: s.sub_name,
                    subCode: s.sub_code,
                    sclassName: s.classes,
                }));
                dispatch(getSubjectsSuccess(mapped));
            }
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

export const getTeacherFreeClassSubjects = (id) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const { data, error } = await supabase
            .from('subjects')
            .select('*')
            .eq('class_id', id)
            .is('teacher_id', null);
        if (error) throw error;
        if (!data || data.length === 0) {
            dispatch(getFailed("No subjects found"));
        } else {
            const mapped = data.map(s => ({
                ...s,
                _id: s.id,
                subName: s.sub_name,
                subCode: s.sub_code,
            }));
            dispatch(getSubjectsSuccess(mapped));
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

export const getSubjectDetails = (id, address) => async (dispatch) => {
    dispatch(getSubDetailsRequest());
    try {
        const { data, error } = await supabase
            .from('subjects')
            .select('*, classes:class_id(id, class_name), teachers:teacher_id(id, name)')
            .eq('id', id)
            .single();
        if (error) throw error;
        const result = {
            ...data,
            _id: data.id,
            subName: data.sub_name,
            subCode: data.sub_code,
            sclassName: data.classes,
            teacher: data.teachers,
        };
        delete result.classes;
        delete result.teachers;
        dispatch(getSubDetailsSuccess(result));
    } catch (error) {
        dispatch(getError(error));
    }
};

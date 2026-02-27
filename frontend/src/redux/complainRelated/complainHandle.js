import { supabase } from '../../supabaseClient';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError
} from './complainSlice';

export const getAllComplains = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const { data, error } = await supabase
            .from('complains')
            .select('*, students:user_id(id, name)')
            .eq('school_id', id);
        if (error) throw error;
        if (!data || data.length === 0) {
            dispatch(getFailed("No complains found"));
        } else {
            const mapped = data.map(c => ({
                ...c,
                _id: c.id,
                user: c.students,
            }));
            dispatch(getSuccess(mapped));
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

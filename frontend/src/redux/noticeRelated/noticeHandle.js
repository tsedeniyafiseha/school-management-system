import { supabase } from '../../supabaseClient';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError
} from './noticeSlice';

export const getAllNotices = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const { data, error } = await supabase
            .from('notices')
            .select('*')
            .eq('school_id', id);
        if (error) throw error;
        if (!data || data.length === 0) {
            dispatch(getFailed("No notices found"));
        } else {
            const mapped = data.map(n => ({
                ...n,
                _id: n.id,
            }));
            dispatch(getSuccess(mapped));
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

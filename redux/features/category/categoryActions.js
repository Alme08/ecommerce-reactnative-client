import { server } from '../../store';
import axios from 'axios';

// GET ALL CATEGORIES DATA ACTION

export const getAllCategoryData = () => async dispatch => {
	try {
		dispatch({
			type: 'getCategoriesDataRequest',
		});
		const { data } = await axios.get(`${server}/cat/get-all`);
		dispatch({
			type: 'getCategoriesDataSuccess',
			payload: data?.categories,
		});
	} catch (error) {
		dispatch({
			type: 'getCategoriesDataFail',
			payload: error.response.data.message,
		});
	}
};

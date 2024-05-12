import { server } from '../../store';
import axios from 'axios';

// GET ALL PRODUCTS DATA ACTION

export const getAllProductData = (keyword, category) => async dispatch => {
	try {
		dispatch({
			type: 'getAllProductDataRequest',
		});
		const { data } = await axios.get(`${server}/product/get-all`, {
			params: {
				keyword: keyword,
				category: category,
			},
		});
		dispatch({
			type: 'getAllProductDataSuccess',
			payload: data?.products,
		});
	} catch (error) {
		dispatch({
			type: 'getAllProductDataFail',
			payload: error.response.data.message,
		});
	}
};

import { server } from '../../store';
import axios from 'axios';

// GET ALL PRODUCTS DATA ACTION

export const getAllProductData = () => async dispatch => {
	try {
		dispatch({
			type: 'getAllProductDataRequest',
		});
		const { data } = await axios.get(`${server}/product/get-all`);
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

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


export const getProductData = (id) => async dispatch => {
	console.log(id)
	try {
		dispatch({
			type: 'getProductDataRequest',
		});
		const { data } = await axios.get(`${server}/product/${id}`);
		dispatch({
			type: 'getProductDataSuccess',
			payload: data?.product,
		}); 
	} catch (error) {
		dispatch({
			type: 'getProductDataFail',
			payload: error.response.data.message,
		});
	}
};
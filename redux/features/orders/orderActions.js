import { server } from '../../store';
import axios from 'axios';

// GET ALL ORDERS

export const getAllOrdersData = () => async dispatch => {
	try {
		dispatch({
			type: 'getAllOrdersDataRequest',
		});
		const { data } = await axios.get(`${server}/order/my-orders`);
		dispatch({
			type: 'getAllOrdersDataSuccess',
			payload: data?.orders,
		});
	} catch (error) {
		dispatch({
			type: 'getAllProductDataFail',
			payload: error.response.data.message,
		});
	}
};

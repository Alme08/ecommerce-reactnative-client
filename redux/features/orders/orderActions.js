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
			type: 'getAllOrdersDataFail',
			payload: error.response.data.message,
		});
	}
};

// GET ALL ORDERS
export const getAllOrders = () => async dispatch => {
	try {
		dispatch({
			type: 'getAllOrdersDataAdminRequest',
		});
		const { data } = await axios.get(`${server}/order/admin/get-all-orders`);
		dispatch({
			type: 'getAllOrdersDataAdminSuccess',
			payload: data?.orders,
		});
	} catch (error) {
		dispatch({
			type: 'getAllOrdersDataAdminFail',
			payload: error.response.data.message,
		});
	}
};

// CHANGE ORDER STATUS
export const changeOrderStatus = id => async dispatch => {
	try {
		dispatch({
			type: 'changeOrderStatusRequest',
		});
		const { data } = await axios.put(`${server}/order/admin/order/${id}`);
		dispatch({
			type: 'changeOrderStatusSuccess',
			payload: data?.order,
		});
	} catch (error) {
		dispatch({
			type: 'changeOrderStatusFail',
			payload: error.response.data.message,
		});
	}
};

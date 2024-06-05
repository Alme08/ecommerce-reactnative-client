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

// PAYMENT CONTROLLER
export const payment = totalAmount => async dispatch => {
	try {
		dispatch({
			type: 'paymentRequest',
		});
		const { data } = await axios.post(`${server}/order/payments`, {
			totalAmount: totalAmount,
		});
		dispatch({
			type: 'paymentSuccess',
			payload: data?.client_secret,
		});
	} catch (error) {
		dispatch({
			type: 'paymentFail',
			payload: error.response.data.message,
		});
	}
};

// CREATE ORDER
export const createOrder = order => async dispatch => {
	try {
		dispatch({
			type: 'createOrderRequest',
		});
		const { data } = await axios.post(`${server}/order/create`, order);
		dispatch({
			type: 'createOrderSuccess',
			payload: data?.order,
		});
	} catch (error) {
		dispatch({
			type: 'createOrderFail',
			payload: error.response.data.message,
		});
	}
};

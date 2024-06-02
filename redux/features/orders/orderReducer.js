import { createReducer } from '@reduxjs/toolkit';

export const orderReducer = createReducer({}, builder => {
	// error message cases
	builder.addCase('clearError', state => {
		state.error = null;
	});
	builder.addCase('clearMessage', state => {
		state.message = null;
	});

	// get all orders
	builder.addCase('getAllOrdersDataRequest', (state, action) => {
		state.loading = true;
	});
	builder.addCase('getAllOrdersDataSuccess', (state, action) => {
		state.orders = action.payload;
		state.loading = false;
	});
	builder.addCase('getAllOrdersDataFail', (state, action) => {
		state.error = action.payload;
	});

	//change order status
	builder.addCase('changeOrderStatusRequest', (state, action) => {
		state.loading = true;
	});
	builder.addCase('changeOrderStatusSuccess', (state, action) => {
		state.order = action.payload;
		state.loading = false;
	});
	builder.addCase('changeOrderStatusFail', (state, action) => {
		state.error = action.payload;
	});

	// get all orders admin
	builder.addCase('getAllOrdersDataAdminRequest', (state, action) => {
		state.loading = true;
	});
	builder.addCase('getAllOrdersDataAdminSuccess', (state, action) => {
		state.orders = action.payload;
		state.loading = false;
	});
	builder.addCase('getAllOrdersDataAdminFail', (state, action) => {
		state.error = action.payload;
	});
});

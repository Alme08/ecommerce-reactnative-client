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
});

import { createReducer } from '@reduxjs/toolkit';

export const categoryReducer = createReducer({}, builder => {
	// error message cases
	builder.addCase('clearError', state => {
		state.error = null;
	});
	builder.addCase('clearMessage', state => {
		state.message = null;
	});

	// get categories data
	builder.addCase('getCategoriesDataRequest', (state, action) => {
		state.loading = true;
	});
	builder.addCase('getCategoriesDataSuccess', (state, action) => {
		state.loading = false;
		state.categories = action.payload;
	});
	builder.addCase('getCategoriesDataFail', (state, action) => {
		state.error = action.payload;
	});
});

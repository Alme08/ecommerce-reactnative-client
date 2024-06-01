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

	// create category
	builder.addCase('createCategoryRequest', (state, action) => {
		state.loading = true;
	});
	builder.addCase('createCategorySuccess', (state, action) => {
		state.loading = false;
		state.message = action.payload;
	});
	builder.addCase('createCategoryFail', (state, action) => {
		state.error = action.payload;
	});

	// update category
	builder.addCase('updateCategoryRequest', (state, action) => {
		state.loading = true;
	});
	builder.addCase('updateCategorySuccess', (state, action) => {
		state.loading = false;
		state.message = action.payload;
	});
	builder.addCase('updateCategoryFail', (state, action) => {
		state.error = action.payload;
	});

	// delete category
	builder.addCase('deleteCategoryRequest', (state, action) => {
		state.loading = true;
	});
	builder.addCase('deleteCategorySuccess', (state, action) => {
		state.loading = false;
		state.message = action.payload;
	});
	builder.addCase('deleteCategoryFail', (state, action) => {
		state.error = action.payload;
	});
});

import { createReducer } from '@reduxjs/toolkit';

export const productReducer = createReducer({}, builder => {
	// error message cases
	builder.addCase('clearError', state => {
		state.error = null;
	});
	builder.addCase('clearMessage', state => {
		state.message = null;
	});

	// get products data
	builder.addCase('getAllProductDataRequest', (state, action) => {
		state.loading = true;
	});
	builder.addCase('getAllProductDataSuccess', (state, action) => {
		state.products = action.payload;
		state.loading = false;
	});
	builder.addCase('getAllProductDataFail', (state, action) => {
		state.error = action.payload;
	});

	//create product
	builder.addCase('createProductRequest', (state, action) => {
		state.loading = true;
	});
	builder.addCase('createProductSuccess', (state, action) => {
		state.loading = false;
		state.message = action.payload;
	});
	builder.addCase('createProductFail', (state, action) => {
		state.error = action.payload;
	});

	//update product image
	builder.addCase('updateProductPicRequest', (state, action) => {
		state.loading = true;
	});
	builder.addCase('updateProductPicSuccess', (state, action) => {
		state.loading = false;
		state.message = action.payload;
	});
	builder.addCase('updateProductPicFail', (state, action) => {
		state.error = action.payload;
	});

	//update product
	builder.addCase('updateProductRequest', (state, action) => {
		state.loading = true;
	});
	builder.addCase('updateProductSuccess', (state, action) => {
		state.loading = false;
		state.message = action.payload;
	});
	builder.addCase('updateProductFail', (state, action) => {
		state.error = action.payload;
	});

	//delete image
	builder.addCase('deleteImageRequest', (state, action) => {
		state.loading = true;
	});
	builder.addCase('deleteImageSuccess', (state, action) => {
		state.loading = false;
		state.message = action.payload;
	});
	builder.addCase('deleteImageFail', (state, action) => {
		state.error = action.payload;
	});

	//change product status
	builder.addCase('changeProductStatusRequest', (state, action) => {
		state.loading = true;
	});
	builder.addCase('changeProductStatusSuccess', (state, action) => {
		state.loading = false;
		state.message = action.payload;
	});
	builder.addCase('changeProductStatusFail', (state, action) => {
		state.error = action.payload;
	});
});

export const productDetailReducer = createReducer({}, builder => {
	// error message cases
	builder.addCase('clearError', state => {
		state.error = null;
	});
	builder.addCase('clearMessage', state => {
		state.message = null;
	});

	// get categories data
	builder.addCase('getProductDataRequest', (state, action) => {
		state.loading = true;
	});
	builder.addCase('getProductDataSuccess', (state, action) => {
		state.product = action.payload;
		state.loading = false;
	});
	builder.addCase('getProductDataFail', (state, action) => {
		state.error = action.payload;
	});
});

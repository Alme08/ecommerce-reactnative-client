import { server } from '../../store';
import axios from 'axios';
import FormData from 'form-data';

// GET ALL PRODUCTS DATA ACTION

export const getAllProductData = (keyword, category) => async dispatch => {
	try {
		dispatch({
			type: 'getAllProductDataRequest',
		});
		const { data } = await axios.get(`${server}/product/get-all`, {
			params: {
				keyword: keyword,
				category: category,
			},
		});
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

// CREATE PRODUCT
export const createProduct = (form, file) => async dispatch => {
	try {
		let formData = new FormData();
		formData.append('file', {
			uri: file.uri,
			type: file.mimeType,
			name: file.fileName,
		});
		formData.append('name', form.name);
		formData.append('description', form.description);
		formData.append('price', form.price);
		formData.append('stock', form.stock);
		formData.append('category', form.category);

		dispatch({
			type: 'createProductRequest',
		});
		const { data } = await axios.post(`${server}/product/create`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		dispatch({
			type: 'createProductSuccess',
			payload: data.message,
		});

		return data.productId;
	} catch (error) {
		console.log(error);
		dispatch({
			type: 'createProductFail',
			payload: error.response.data.message,
		});
	}
};

// UPDATE PRODUCT IMAGE
export const updateProductPic = (file, productId) => async dispatch => {
	try {
		let formData = new FormData();
		formData.append('file', {
			uri: file.uri,
			type: file.mimeType,
			name: file.fileName,
		});
		dispatch({
			type: 'updateProductPicRequest',
		});
		const { data } = await axios.put(
			`${server}/product/image/${productId}`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
		);
		dispatch({
			type: 'updateProductPicSuccess',
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: 'updateProductPicFail',
			payload: error.response.data.message,
		});
	}
};

// DELETE PRODUCT IMAGE
export const deleteProductImage = (productId, imageId) => async dispatch => {
	try {
		dispatch({
			type: 'deleteImageRequest',
		});
		const { data } = await axios.delete(
			`${server}/product/delete-image/${productId}?id=${imageId}`
		);
		dispatch({
			type: 'deleteImageSuccess',
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: 'deleteImageFail',
			payload: error.response.data.message,
		});
	}
};

export const changeProductStatus = productId => async dispatch => {
	try {
		dispatch({
			type: 'changeProductStatusRequest',
		});
		const { data } = await axios.put(
			`${server}/product/${productId}/change-status`
		);
		dispatch({
			type: 'changeProductStatusSuccess',
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: 'changeProductStatusFail',
			payload: error.response.data.message,
		});
	}
};

// GET PRODUCT DATA
export const getProductData = id => async dispatch => {
	console.log(id);
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

export const updateProduct = (form, productId) => async dispatch => {
	try {
		dispatch({
			type: 'updateProductRequest',
		});
		const { data } = await axios.put(`${server}/product/${productId}`, form);
		dispatch({
			type: 'updateProductSuccess',
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: 'updateProductFail',
			payload: error.response.data.message,
		});
	}
};

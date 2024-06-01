import { server } from '../../store';
import axios from 'axios';

// GET ALL CATEGORIES DATA ACTION

export const getAllCategoryData = () => async dispatch => {
	try {
		dispatch({
			type: 'getCategoriesDataRequest',
		});
		const { data } = await axios.get(`${server}/cat/get-all`);
		dispatch({
			type: 'getCategoriesDataSuccess',
			payload: data?.categories,
		});
	} catch (error) {
		dispatch({
			type: 'getCategoriesDataFail',
			payload: error.response.data.message,
		});
	}
};

// CREATE CATEGORY ACTION
export const createCategory = formData => async dispatch => {
	try {
		dispatch({
			type: 'createCategoryRequest',
		});
		const { data } = await axios.post(`${server}/cat/create`, formData);
		dispatch({
			type: 'createCategorySuccess',
			payload: data.category,
		});
	} catch (error) {
		dispatch({
			type: 'createCategoryFail',
			payload: error.response.data.message,
		});
	}
};

//UPDATE CATEGORY ACTION
export const updateCategory = (id, formData) => async dispatch => {
	try {
		dispatch({
			type: 'updateCategoryRequest',
		});
		const { data } = await axios.put(`${server}/cat/update/${id}`, formData);
		dispatch({
			type: 'updateCategorySuccess',
			payload: data.category,
		});
	} catch (error) {
		dispatch({
			type: 'updateCategoryFail',
			payload: error.response.data.message,
		});
	}
};

// DELETE CATEGORY ACTION
export const deleteCategory = id => async dispatch => {
	try {
		dispatch({
			type: 'deleteCategoryRequest',
		});
		await axios.delete(`${server}/cat/delete/${id}`);
		dispatch({
			type: 'deleteCategorySuccess',
		});
	} catch (error) {
		dispatch({
			type: 'deleteCategoryFail',
			payload: error.response.data.message,
		});
	}
};

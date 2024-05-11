import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './features/auth/userReducer';
import { categoryReducer } from './features/category/categoryReducer';
import { productReducer } from './features/product/productReducer';

export default configureStore({
	reducer: {
		user: userReducer,
		categories: categoryReducer,
		products: productReducer,
	},
});

// HOST
export const server = 'http://172.16.1.105:8080/api/v1';

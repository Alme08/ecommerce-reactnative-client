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
export const server =
	'https://ecommerce-reactnative-server.onrender.com/api/v1';

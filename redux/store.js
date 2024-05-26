import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './features/auth/userReducer';
import { categoryReducer } from './features/category/categoryReducer';
import { productReducer } from './features/product/productReducer';
import { productDetailReducer } from './features/product/productReducer';
import { orderReducer } from './features/orders/orderReducer';
import cartReducer from './features/cart/cartReducer';

export default configureStore({
	reducer: {
		user: userReducer,
		categories: categoryReducer,
		products: productReducer,
		product: productDetailReducer,
		orders: orderReducer,
		cart: cartReducer,
	},
});

// HOST
export const server =
	'https://ecommerce-reactnative-server.onrender.com/api/v1';

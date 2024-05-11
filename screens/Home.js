import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import Categories from '../components/category/Categories';
import Banner from '../components/Banner/Banner';
import Products from '../components/Products/Products';
import Header from '../components/Layout/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../redux/features/auth/userActions';
import { getAllCategoryData } from '../redux/features/category/categoryActions';
import { getAllProductData } from '../redux/features/product/productActions';

const Home = () => {
	const dispatch = useDispatch();
	const { isAuth } = useSelector(state => state.user);
	const { categories } = useSelector(state => state.categories);
	const { products } = useSelector(state => state.products);

	useEffect(() => {
		dispatch(getUserData());
		dispatch(getAllCategoryData());
		dispatch(getAllProductData());
	}, [dispatch]);

	return (
		<Layout>
			<Header />
			<Categories categories={categories} />
			<Banner />
			<Products products={products} />
		</Layout>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default Home;

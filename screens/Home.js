import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
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
	const [category, setCategory] = useState('');
	const [keyword, setKeyword] = useState('');

	const dispatch = useDispatch();
	const { isAuth } = useSelector(state => state.user);
	const { categories } = useSelector(state => state.categories);
	const { products, loading } = useSelector(state => state.products);

	useEffect(() => {
		dispatch(getUserData());
		dispatch(getAllCategoryData());
		dispatch(getAllProductData(keyword, category));
	}, [dispatch, keyword, category]);

	return (
		<Layout>
			<Header keyword={keyword} setKeyword={setKeyword} />
			<Categories
				categories={categories}
				category={category}
				setCategory={setCategory}
			/>
			<Banner />
			<Products products={products} loading={loading} />
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

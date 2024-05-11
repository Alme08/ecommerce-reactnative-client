import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import ProductCard from './ProductCard';
import { productsData } from '../../data/productsData';

const Products = ({ products }) => {
	return (
		<View style={styles.container}>
			{products?.map(product => (
				<ProductCard key={product._id} product={product} />
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
});

export default Products;

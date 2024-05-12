import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import ProductCard from './ProductCard';

const Products = ({ products, loading }) => {
	if (loading) {
		return <Text>Loading...</Text>;
	}
	if (products?.length === 0 && !loading) {
		return <Text>No se ha encontrado ningún producto.</Text>;
	}
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

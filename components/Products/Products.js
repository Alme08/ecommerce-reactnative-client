import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import ProductCard from './ProductCard';

const Products = ({ products, loading }) => {
	if (loading) {
		return <Text style={styles.search}>Cargando...</Text>;
	}
	if (products?.length === 0 && !loading) {
		return (
			<Text style={styles.search}>No se ha encontrado ningún producto.</Text>
		);
	}
	return (
		<View style={styles.container}>
			{products?.map(product => {
				if (product.active) {
					return (
						<View style={styles.cardContainer} key={product._id}>
							<ProductCard product={product} />
						</View>
					);
				}
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		marginTop: 10,
		marginBottom: 60,
	},
	cardContainer: {
		flexBasis: '48%',
		marginBottom: 10,
	},
	search: {
		textAlign: 'center',
		margin: 'auto',
		paddingTop: 50,
		width: 300,
		height: 500,
		fontSize: 20,
	},
});

export default Products;

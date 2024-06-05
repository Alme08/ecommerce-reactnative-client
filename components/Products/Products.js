import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import ProductCard from './ProductCard';
import productNotFound from "../../assets/productNotFound.webp";

const Products = ({ products, loading }) => {
	if (loading) {
		return (
			<View style={styles.search}>
				<Text style={styles.textSearch}>Cargando...</Text>
			</View>
		);
	}
	if (products?.length === 0 && !loading) {
		return (
			<View style={styles.search}>
				<Text style={styles.textSearch}>No se ha encontrado ningún producto.</Text>
				<Image style={styles.image} source={productNotFound} />
			</View>
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
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		margin: 'auto',
		paddingTop: 50,
		width: '100%',
		height: '100%',
		fontSize: 20,
	},
	textSearch: {
		textAlign: 'center',
		fontSize: 20,
	},
	image: {
		width: 200,
		height: 150,
		resizeMode: "contain",
	}
});

export default Products;

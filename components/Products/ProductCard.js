import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const ProductCard = ({ product }) => {
	const navigation = useNavigation();

	//more details button
	const handleMoreButton = id => {
		navigation.navigate('productDetails', { _id: id });
	};
	//add to cart button
	const handleAddToCArt = id => {
		alert('Added to cart');
	};

	return (
		<View>
			<View style={styles.card}>
				<Image
					style={styles.cardImage}
					source={{ uri: product?.images[0].url }}
				/>
				<Text style={styles.cardTitle}>{product?.name}</Text>
				<Text style={styles.cardDesc}>${product?.price}</Text>
				<View style={styles.btnContainer}>
					<TouchableOpacity
						style={styles.btn}
						onPress={() => handleMoreButton(product?._id)}
					>
						<Text style={styles.btnText}>Details</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.btnCart}
						onPress={() => handleAddToCArt()}
					>
						<Text style={[styles.btnText, { color: '#fff' }]}>Add to cart</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		borderWidth: 0,
		borderRadius: 20,
		borderColor: 'lightgray',
		marginVertical: 5,
		marginHorizontal: 8,
		width: 170,
		height: 250,
		padding: 10,
		backgroundColor: '#fff',
		justifyContent: 'space-between',
	},
	cardImage: {
		height: 120,
		width: '100%',
		marginBottom: 10,
	},
	cardTitle: {
		fontSize: 14,
		fontWeight: 'bold',
		marginBottom: 5,
	},
	cardDesc: {
		fontSize: 13,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	btnContainer: {
		marginTop: 5,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	btn: {
		height: 25,
		width: 70,
		borderRadius: 5,
		borderWidth: 2,
		borderColor: '#000',
		justifyContent: 'center',
	},
	btnCart: {
		backgroundColor: '#000',
		height: 25,
		width: 70,
		borderRadius: 5,
		justifyContent: 'center',
	},
	btnText: {
		textAlign: 'center',
		fontSize: 12,
		fontWeight: 'bold',
	},
});

export default ProductCard;

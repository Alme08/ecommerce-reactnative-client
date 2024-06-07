import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/features/cart/cartReducer';

const ProductCard = ({ product }) => {
	const navigation = useNavigation();
	const dispatch = useDispatch();

	// More details button
	const handleMoreButton = id => {
		navigation.navigate('Detalles de Producto', { _id: id });
	};

	// Add to cart button
	const handleAddToCart = () => {
		if(product.stock > 0 ){
			dispatch(addItem(product));
			alert('producto añadido al carrito');		
		}
	};

	return (
		<View>
			<View style={styles.card}>
				{product?.images.length > 0 ? (
					<Image
						style={styles.cardImage}
						source={{ uri: product?.images[0].url }}
					/>
				) : (
					<Image
						style={styles.cardImage}
						source={require('../../assets/no-image-found.jpg')}
					/>
				)}
				<Text style={styles.cardTitle}>{product?.name}</Text>
				<Text style={styles.cardDesc}>Precio: {product?.price}$</Text>
				<View style={styles.btnContainer}>
					<TouchableOpacity
						style={styles.btn}
						onPress={() => handleMoreButton(product?._id)}
					>
						<Text style={styles.btnText}>Detalles</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.btnCart} onPress={handleAddToCart}>
						<Text style={[styles.btnText, { color: '#fff' }]}>
						{product.stock <= 0 ? "Agotado" : `Añadir`}
						</Text>
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
		marginBottom: 2,
	},
	cardDesc: {
		fontSize: 13,
		fontWeight: 'bold',
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
		borderWidth: 1,
		borderColor: '#000',
		justifyContent: 'center',
	},
	btnCart: {
		backgroundColor: 'orange',
		borderWidth: 2,
		borderColor: '#f98b16',
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

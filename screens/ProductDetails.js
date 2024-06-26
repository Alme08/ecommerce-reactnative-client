import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getProductData } from '../redux/features/product/productActions';
import Layout from '../components/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/features/cart/cartReducer';
import { AntDesign } from '@expo/vector-icons';
import Slider from '../components/Banner/Slider';
import CommentBox from '../components/Products/CommentBox';
import { getAllOrdersData } from '../redux/features/orders/orderActions';

const ProductDetails = ({ route }) => {
	const dispatch = useDispatch();
	const [productDetails, setProductDetails] = useState({});
	const [qty, setQty] = useState(1);
	const { product, loading } = useSelector(state => state.product);
	const { params } = route;
	const { orders } = useSelector(state => state.orders);
	const hasPurchased = orders?.some(order =>
		order.orderItems.some(product => product.product === productDetails._id)
	);

	const stars = Array.from({ length: 5 }, (_, i) => {
		const half = i + 0.5;
		return (
			<AntDesign
				key={i}
				name={
					productDetails.rating > i
						? 'star'
						: productDetails.rating > half
						? 'starhalf'
						: 'staro'
				}
				size={24}
				color='#FFD700'
			/>
		);
	});
	useEffect(() => {
		if (params?._id) {
			dispatch(getProductData(params._id));
		}
		dispatch(getAllOrdersData());
	}, [dispatch, params?._id]);

	useEffect(() => {
		if (product) {
			setProductDetails(product);
		}
	}, [product]);

	const handleAddQty = () => {
		if (qty >= 10 || qty >= productDetails.stock) {
			return alert('Max quantity reached or insufficient stock');
		}
		setQty(prev => prev + 1);
	};

	const handleRemoveQty = () => {
		if (qty <= 1) return;
		setQty(prev => prev - 1);
	};

	if (loading) {
		return (
			<Layout>
				<Text style={styles.loading}>Cargando...</Text>
			</Layout>
		);
	}

	if (!productDetails || !productDetails.images || !productDetails.images[0]) {
		return (
			<Layout>
				<Text style={styles.loading}>
					Error: Producto no encontrado o sin imagen.
				</Text>
			</Layout>
		);
	}

	const handleAddToCart = () => {
		for (let i = 0; i < qty; i++) {
			dispatch(addItem(product));
		}
		alert('Producto añadido al carrito');
	};

	return (
		<Layout>
			<Slider images={productDetails.images} />
			<View style={styles.container}>
				<Text style={styles.title}>{productDetails.name}</Text>
				<View style={{ flexDirection: 'row' }}>{stars}</View>

				<Text style={styles.title}>Precio: {productDetails.price}$</Text>
				<Text style={styles.desc}>{productDetails.description}</Text>
				<View style={styles.btnContainer}>
					<TouchableOpacity
						style={styles.btnCart}
						onPress={handleAddToCart}
						disabled={productDetails.stock < qty}
					>
						<Text style={styles.btnCartText}>
							{productDetails.stock < qty
								? 'Agotado'
								: `Añadir ${qty} al carrito`}
						</Text>
					</TouchableOpacity>
					<View style={styles.qtyContainer}>
						<TouchableOpacity style={styles.btnQty} onPress={handleRemoveQty}>
							<Text style={styles.btnQtyText}>-</Text>
						</TouchableOpacity>
						<Text>{qty}</Text>
						<TouchableOpacity
							style={[
								styles.btnQty,
								qty >= 10 || qty >= productDetails.stock
									? styles.btnDisabled
									: null,
							]}
							onPress={handleAddQty}
							disabled={qty >= 10 || qty >= productDetails.stock}
						>
							<Text style={styles.btnQtyText}>+</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
			<View style={styles.container}>
				<CommentBox
					reviews={productDetails.reviews}
					hasPurchased={hasPurchased}
					productId={productDetails._id}
				/>
			</View>
		</Layout>
	);
};

const styles = StyleSheet.create({
	image: {
		height: 330,
		width: '100%',
	},
	loading: {
		textAlign: 'center',
		margin: 'auto',
		paddingTop: 250,
		width: 300,
		height: 500,
		fontSize: 40,
	},
	container: {
		marginVertical: 15,
		marginHorizontal: 10,
	},
	title: {
		fontSize: 18,
		textAlign: 'left',
	},
	desc: {
		fontSize: 12,
		textTransform: 'capitalize',
		textAlign: 'left',
		marginVertical: 10,
	},
	btnContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 20,
		marginHorizontal: 10,
	},
	btnCart: {
		width: 180,
		backgroundColor: '#000',
		borderRadius: 5,
		height: 40,
		justifyContent: 'center',
	},
	btnCartText: {
		color: '#fff',
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 16,
	},
	qtyContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	btnQty: {
		backgroundColor: 'lightgray',
		width: 40,
		alignItems: 'center',
		marginHorizontal: 10,
	},
	btnQtyText: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	btnDisabled: {
		backgroundColor: 'darkgray',
	},
});

export default ProductDetails;

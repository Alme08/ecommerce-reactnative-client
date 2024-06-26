import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	TextInput,
	ScrollView,
	Alert,
	Button,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { payment, createOrder } from '../redux/features/orders/orderActions';
import { clearCart } from '../redux/features/cart/cartReducer';
import Layout from '../components/Layout/Layout';
import TicketsPDF from '../components/Tickets/Ticket';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';

const Checkout = ({ navigation }) => {
	const cart = useSelector(state => state.cart);
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [country, setCountry] = useState('');
	const { initPaymentSheet, presentPaymentSheet } = useStripe();
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	let orderData = {};
	const totalAmount = cart.items.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	);

	const itemPrice = totalAmount;
	const tax = 0.16;
	const shippingCharges = 0.07;
	const totalOrderAmount =
		itemPrice + itemPrice * tax + itemPrice * shippingCharges;

	const fetchPaymentSheetParams = async () => {
		const client_secret = await dispatch(payment(totalOrderAmount));

		return client_secret;
	};

	const openPaymentSheet = async () => {
		const { error } = await presentPaymentSheet();

		if (error) {
			Alert.alert(`Error code: ${error.code}`, error.message);
		} else {
			sendOrder();
		}
	};
	const handleOrder = async metodo => {
		setLoading(true);
		const orderItems = cart.items.map(item => ({
			name: item.name,
			price: item.price,
			quantity: item.quantity,
			product: item._id,
		}));

		orderData = {
			shippingInfo: {
				address,
				city,
				country,
			},
			orderItems,
			paymentInfo: {
				id: null,
				status: null,
			},
			paymentMethod: metodo,
			itemPrice,
			tax,
			shippingCharges,
			totalAmount: totalOrderAmount,
		};
		if (metodo === 'ONLINE') {
			// navigation.navigate('Pagar', { totalAmount: totalOrderAmount });
			const client_secret = await fetchPaymentSheetParams();
			const { error } = await initPaymentSheet({
				merchantDisplayName: 'Example, Inc.',
				paymentIntentClientSecret: client_secret,
			});
			if (!error) {
				openPaymentSheet();
			} else {
				console.log('error:' + error);
			}
		} else {
			sendOrder();
		}
	};

	const handleCOD = () => {
		handleOrder('COD');
	};

	const handleOnline = () => {
		handleOrder('ONLINE');
	};

	const sendOrder = async () => {
		const err2 = await dispatch(createOrder(orderData));
		TicketsPDF(orderData);
		dispatch(clearCart());
		alert('Orden enviada con exito');
		navigation.navigate('home');
	};
	const truncate = (text, length) => {
		if (text.length > length) {
			return text.substring(0, length) + '...';
		}
		return text;
	};

	return (
		<Layout>
			<StripeProvider publishableKey='pk_test_51LRJG6C1EQKK0UsyBrLhd0IaijpSSCRMrgOiF8gHcdwbdlKp026sTX7e9ipSIqR4KNDQfDbxBsZJw5tzJUSnmrEe00s6YqVRuQ'>
				<ScrollView contentContainerStyle={styles.container}>
					<Text style={styles.heading}>Opciones de pago</Text>
					{cart.items.map(item => (
						<View key={item._id} style={styles.cartItem}>
							<Text style={styles.cartItemText}>
								{truncate(item?.name, 20)} x {item.quantity}
							</Text>
							<Text style={styles.cartItemText}>
								{(item.price * item.quantity).toFixed(2)}$
							</Text>
						</View>
					))}
					<Text style={styles.price}>
						Cantidad del IVA del 16%: ${(itemPrice * tax).toFixed(2)}
					</Text>
					<Text style={styles.price}>
						Costo de envio: ${(itemPrice * shippingCharges).toFixed(2)}
					</Text>
					<Text style={styles.price}>
						Cantidad Total : ${totalOrderAmount.toFixed(2)}
					</Text>
					<View style={styles.paymentCard}>
						<TextInput
							style={styles.input}
							placeholder='Dirección'
							value={address}
							onChangeText={setAddress}
						/>
						<TextInput
							style={styles.input}
							placeholder='Ciudad'
							value={city}
							onChangeText={setCity}
						/>
						<TextInput
							style={styles.input}
							placeholder='País'
							value={country}
							onChangeText={setCountry}
						/>
						<Text style={styles.paymentHeading}>
							Selecciona tus métodos de pago
						</Text>
						<TouchableOpacity style={styles.paymentBtn} onPress={handleCOD}>
							<Text style={styles.paymentBtnText}>Efectivo</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.paymentBtn} onPress={handleOnline}>
							<Text style={styles.paymentBtnText}>
								Online (TARJETA CREDITO | DEBITO)
							</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</StripeProvider>
		</Layout>
	);
};

export default Checkout;

const styles = StyleSheet.create({
	container: {
		padding: 10,
	},
	heading: {
		fontSize: 30,
		fontWeight: '500',
		marginVertical: 10,
		textAlign: 'center',
	},
	input: {
		width: '100%',
		padding: 10,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5,
		marginBottom: 10,
	},
	price: {
		fontSize: 20,
		marginBottom: 10,
		color: 'gray',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	cartItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	cartItemText: {
		fontSize: 16,
	},
	paymentCard: {
		backgroundColor: '#fff',
		width: '90%',
		borderRadius: 10,
		padding: 30,
		marginVertical: 10,
		marginBottom: 100,
		alignSelf: 'center',
	},
	paymentHeading: {
		color: 'gray',
		marginBottom: 10,
	},
	paymentBtn: {
		backgroundColor: '#000',
		height: 40,
		borderRadius: 10,
		justifyContent: 'center',
		marginVertical: 10,
	},
	paymentBtnText: {
		color: '#fff',
		textAlign: 'center',
	},
});

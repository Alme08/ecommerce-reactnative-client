import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Layout from '../components/Layout/Layout';

const Checkout = ({ navigation }) => {
	const handleCOD = () => {
		alert('Order Placed Successfully');
	};
	const handleOnline = () => {
		alert('youre being redirected to payment gateway');
		navigation.navigate('payment');
	};
	return (
		<Layout>
			<View style={styles.container}>
				<Text style={styles.heading}>Opciones de pago</Text>
				<Text style={styles.price}>Cantidad Total : 101$</Text>
				<View style={styles.paymentCard}>
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
			</View>
		</Layout>
	);
};

export default Checkout;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		height: '90%',
	},
	heading: {
		fontSize: 30,
		fontWeight: '500',
		marginVertical: 10,
	},
	price: {
		fontSize: 20,
		marginBottom: 10,
		color: 'gray',
	},
	paymentCard: {
		backgroundColor: '#fff',
		width: '90%',
		borderRadius: 10,
		padding: 30,
		marginVertical: 10,
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

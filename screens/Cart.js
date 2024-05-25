import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { cartData } from '../data/cartData';
import PriceTable from '../components/cart/PriceTable';
import Layout from '../components/Layout/Layout';
import CartItem from '../components/cart/CartItem';

const Cart = ({ navigation }) => {
	const [cartItems, setCartItems] = useState(cartData);
	return (
		<Layout>
			<Text style={styles.heading}>
				{cartItems?.length > 0
					? `Tienes ${cartItems?.length} producto en tu carrito.`
					: 'Tu carrito está vacío.'}
			</Text>
			{cartItems?.length > 0 && (
				<>
					<ScrollView>
						{cartItems?.map(item => (
							<CartItem item={item} key={item._id} />
						))}
					</ScrollView>
					<View>
						<PriceTable title={'Precio'} price={999} />
						<PriceTable title={'IVA'} price={1} />
						<PriceTable title={'Precio'} price={1} />
						<View style={styles.grandTotal}>
							<PriceTable title={'Total'} price={1001} />
						</View>
						<TouchableOpacity
							style={styles.btnCheckout}
							onPress={() => navigation.navigate('checkout')}
						>
							<Text style={styles.btnCheckoutText}>COMPROBAR</Text>
						</TouchableOpacity>
					</View>
				</>
			)}
		</Layout>
	);
};

const styles = StyleSheet.create({
	heading: {
		textAlign: 'center',
		color: 'green',
		marginTop: 10,
	},
	grandTotal: {
		borderWidth: 1,
		borderColor: 'lightgray',
		backgroundColor: '#fff',
		padding: 5,
		margin: 5,
		marginHorizontal: 20,
	},
	btnCheckout: {
		marginTop: 20,
		alignItems: 'center',
		justifyContent: 'center',
		height: 40,
		backgroundColor: '#000',
		width: '90%',
		marginHorizontal: 20,
		borderRadius: 20,
	},
	btnCheckoutText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
	},
});

export default Cart;

import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
  } from 'react-native';
  import React from 'react';
  import { useSelector, useDispatch } from 'react-redux';
  import PriceTable from '../components/cart/PriceTable';
  import Layout from '../components/Layout/Layout';
  import CartItem from '../components/cart/CartItem';
  import { clearCart, removeItem } from '../redux/features/cart/cartReducer';
  
  const Cart = ({ navigation }) => {
	const cartItems = useSelector(state => state.cart.items);
	const dispatch = useDispatch();
  
	const handleRemoveItem = id => {
	  dispatch(removeItem(id));
	};
  
	const handleClearCart = () => {
	  dispatch(clearCart());
	};
  
	const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  
	return (
	  <Layout>
		<Text style={styles.heading}>
		  {cartItems.length > 0
			? `Tienes ${cartItems.length} producto${cartItems.length > 1 ? 's' : ''} en tu carrito.`
			: 'Tu carrito está vacío.'}
		</Text>
		{cartItems.length > 0 && (
		  <>
			<ScrollView>
			  {cartItems.map(item => (
				<CartItem item={item} key={item._id} onRemove={handleRemoveItem} />
			  ))}
			</ScrollView>
			<View>
			  <PriceTable title={'Precio'} price={totalPrice} />
			  <PriceTable title={'IVA'} price={totalPrice * 0.21} />
			  <View style={styles.grandTotal}>
				<PriceTable title={'Total'} price={totalPrice * 1.21} />
			  </View>
			  <TouchableOpacity
				style={styles.btnCheckout}
				onPress={() => navigation.navigate('checkout')}
			  >
				<Text style={styles.btnCheckoutText}>COMPROBAR</Text>
			  </TouchableOpacity>
			  <TouchableOpacity
				style={[styles.btnCheckout, { backgroundColor: 'red' }]}
				onPress={handleClearCart}
			  >
				<Text style={styles.btnCheckoutText}>VACIAR CARRITO</Text>
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
  
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import OrderItem from '../../components/Form/OrderItem';
import { getAllOrdersData } from '../../redux/features/orders/orderActions';

const MyOrders = () => {
	const dispatch = useDispatch();
	const { orders } = useSelector(state => state.orders);

	useEffect(() => {
		dispatch(getAllOrdersData());
	}, [dispatch]);

	return (
		<Layout>
			<View style={styles.container}>
				<Text style={styles.heading}>Mis Ordenes</Text>
				<ScrollView>
					{orders?.map(order => (
						<OrderItem key={order._id} order={order} />
					))}
				</ScrollView>
			</View>
		</Layout>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		marginBottom: 100,
	},
	heading: {
		textAlign: 'center',
		color: 'gray',
		fontWeight: 'bold',
		fontSize: 20,
	},
});

export default MyOrders;

import { StyleSheet, Text, View } from 'react-native';
import { format } from 'date-fns';
import React from 'react';

const OrderItem = ({ order }) => {
	return (
		<View style={styles.container}>
			<View style={styles.orderinfo}>
				<Text>ID Orden : {order._id}</Text>
				<Text>{format(order.createdAt, 'dd-MM-yyyy')}</Text>
			</View>
			{order.orderItems.map(item => (
				<View style={styles.item} key={item._id}>
					<Text>Nombre Producto : {item.name}</Text>
					<Text>Precio : {item.price}</Text>
					<Text>Cantidad : {item.quantity}</Text>
				</View>
			))}
			<Text style={styles.status}>Total amount : {order.totalAmount} $</Text>
			<Text style={styles.status}>Order Status: {order.orderStatus}</Text>
		</View>
	);
};

export default OrderItem;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		margin: 10,
		padding: 10,
		borderRadius: 10,
	},
	orderinfo: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomWidth: 1,
		borderColor: 'lightgray',
		paddingBottom: 5,
	},
	item: {
		borderBottomWidth: 1,
		borderColor: 'lightgray',
		padding: 5,
	},
	status: {
		// borderTopWidth: 1,
		fontWeight: 'bold',
		// borderColor: 'lightgray',
		padding: 5,
	},
});

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { useNavigation, useRoute } from '@react-navigation/native';
import { changeOrderStatus } from '../../redux/features/orders/orderActions';

const EditOrder = () => {
	const route = useRoute();
	const navigation = useNavigation();
	dispatch = useDispatch();
	const { order } = route.params;
	const handleSend = async () => {
		await dispatch(changeOrderStatus(order._id));
		navigation.navigate('Panel de administración');
	};

	return (
		<View>
			<Text style={styles.title}>Orden</Text>
			<View style={styles.container}>
				<View style={styles.orderinfo}>
					<Text>
						<Text style={styles.status}>ID Orden :</Text> {order._id}
					</Text>
					<Text>{format(order.createdAt, 'dd-MM-yyyy')}</Text>
				</View>
				{order.orderItems.map(item => (
					<View style={styles.item} key={item._id}>
						<Text>
							<Text style={styles.status}>Nombre Producto :</Text> {item.name}
						</Text>
						<Text>
							<Text style={styles.status}>Precio :</Text> {item.price}
						</Text>
						<Text>
							<Text style={styles.status}>Cantidad :</Text> {item.quantity}
						</Text>
					</View>
				))}
				<Text>
					<Text style={styles.status}>Precio Total :</Text> {order.totalAmount}$
				</Text>
				<Text style={styles.status}>Dirección de envío:</Text>
				<Text style={{ marginLeft: 20 }}>
					{order.shippingInfo.city}, {order.shippingInfo.address}
				</Text>
				<Text style={[styles.status, { fontSize: 15 }]}>Estado: </Text>
				<Text style={{ marginLeft: 20 }}>{order.orderStatus}</Text>
			</View>

			<TouchableOpacity style={styles.button} onPress={handleSend}>
				<Text style={{ color: '#fff', fontSize: 16 }}>Actualizar estado</Text>
			</TouchableOpacity>
		</View>
	);
};

export default EditOrder;

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	container: {
		margin: 10,
		padding: 10,
		backgroundColor: '#fff',
		borderRadius: 10,
	},
	textInput: {
		fontWeight: 'bold',
		paddingBottom: 5,
	},
	input: {
		padding: 10,
		borderWidth: 1,
		borderColor: 'black',
		height: 40,
		borderRadius: 10,
		marginBottom: 20,
	},
	picker: {
		borderWidth: 1,
		borderColor: 'black',
		borderRadius: 10,
		marginBottom: 20,
	},
	addImage: {
		height: 100,
		width: 80,
		borderRadius: 10,
		backgroundColor: 'gray',
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		height: 100,
		width: 80,
		borderRadius: 10,
	},
	deleteImage: {
		position: 'absolute',
		zIndex: 1,
		backgroundColor: '#fff',
		borderRadius: 50,
		margin: 5,
		left: 50,
	},
	button: {
		marginHorizontal: 'auto',
		alignItems: 'center',
		padding: 10,
		backgroundColor: 'green',
		width: 180,
		borderRadius: 10,
	},
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

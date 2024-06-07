import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	TextInput,
	ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserStatus } from '../../redux/features/auth/userActions';

const FormOrders = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { params } = useRoute();
	const [userKeyword, setUserKeyword] = useState('');
	const [orders, setOrders] = useState(params.data);
	const { users } = useSelector(state => state.user);
	return (
		<View>
			<Text style={styles.title}>Órdenes</Text>
			<View style={styles.container}>
				<TextInput
					placeholder='Buscar cualquier usuario...'
					placeholderTextColor='#ababab'
					style={styles.inputBox}
					value={userKeyword}
					onChangeText={Text => {
						setUserKeyword(Text);
					}}
				/>
				<TouchableOpacity style={styles.searchBtn}>
					<FontAwesome name='search' style={styles.icon} />
				</TouchableOpacity>
			</View>

			<ScrollView style={[styles.container, { marginBottom: 120 }]}>
				<View style={styles.header}>
					<Text style={{ width: '25%', fontWeight: 'bold' }}>Nombre</Text>
					<Text style={{ width: '20%', fontWeight: 'bold' }}>Productos</Text>
					<Text style={{ width: '15%', fontWeight: 'bold' }}>Total</Text>
					<Text style={{ width: '20%', fontWeight: 'bold' }}>Estado</Text>
					<Text style={{ width: '10%' }}></Text>
				</View>
				{orders.map(order => {
					let expReg = new RegExp(userKeyword, 'i');
					if (expReg.test(users.find(user => user._id === order.user).name)) {
						return (
							<View key={order._id} style={styles.body}>
								<Text style={{ width: '25%' }}>
									{users.find(user => user._id === order.user).name}
								</Text>
								<Text style={{ width: '20%' }}>{order.orderItems.length}</Text>
								<Text style={{ width: '15%' }}>{order.totalAmount}$</Text>
								<Text style={{ width: '20%' }}>{order.orderStatus}</Text>
								<View style={styles.actions}>
									<TouchableOpacity
										onPress={() => {
											navigation.navigate('Editar Orden', { order: order });
										}}
									>
										<Feather name='edit' style={styles.editButton} />
									</TouchableOpacity>
								</View>
							</View>
						);
					}
				})}
			</ScrollView>
		</View>
	);
};

export default FormOrders;

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
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingBottom: 10,
	},
	body: {
		paddingVertical: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderTopWidth: 1,
		borderColor: 'lightgray',
	},
	actions: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		gap: 5,
		width: '10%',
	},
	editButton: {
		padding: 8,
		backgroundColor: '#1e91cf',
		fontSize: 15,
		color: '#fff',
	},
	deleteButton: {
		padding: 8,
		fontSize: 15,
		color: '#fff',
	},

	inputBox: {
		borderWidth: 0,
		width: '100%',
		position: 'relative',
		left: 15,
		height: 25,
		color: '#000000',
		paddingLeft: 15,
		fontSize: 16,
		borderRadius: 10,
	},
	searchBtn: {
		position: 'absolute',
		right: '98%',
		top: '55%',
	},
});

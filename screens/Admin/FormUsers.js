import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserStatus } from '../../redux/features/auth/userActions';

const FormUsers = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { params } = useRoute();
	const [userKeyword, setUserKeyword] = useState('');
	const [users, setUsers] = useState(params.data);
	const { user } = useSelector(state => state.user);

	return (
		<View>
			<Text style={styles.title}>Usuarios</Text>
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

			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={{ width: '20%', fontWeight: 'bold' }}>Nombre</Text>
					<Text style={{ width: '27%', fontWeight: 'bold' }}>Teléfono</Text>
					<Text style={{ width: '20%', fontWeight: 'bold' }}>Ciudad</Text>
					<Text style={{ width: '13%', fontWeight: 'bold' }}>Rol</Text>
					<Text style={{ width: '20%' }}></Text>
				</View>
				{users.map(item => {
					let expReg = new RegExp(userKeyword, 'i');
					if (expReg.test(item.name)) {
						return (
							<View key={item._id} style={styles.body}>
								<Text style={{ width: '20%' }}>{item.name}</Text>
								<Text style={{ width: '27%' }}>{item.phone}</Text>
								<Text style={{ width: '20%' }}>{item.city}</Text>
								<Text style={{ width: '13%' }}>{item.role}</Text>
								<View style={styles.actions}>
									<TouchableOpacity
										onPress={() => {
											navigation.navigate('Editar Usuario', { user: item });
										}}
									>
										<Feather name='edit' style={styles.editButton} />
									</TouchableOpacity>
									{user.role === 'administrador' && (
										<TouchableOpacity
											onPress={() => {
												dispatch(changeUserStatus(item._id));
												setUsers(
													users.map(user => {
														if (user._id === item._id) {
															return { ...user, active: !item.active };
														}
														return user;
													})
												);
											}}
										>
											{item.active ? (
												<AntDesign
													name='minuscircleo'
													style={[
														styles.deleteButton,
														{ backgroundColor: 'red' },
													]}
												/>
											) : (
												<AntDesign
													name='pluscircleo'
													style={[
														styles.deleteButton,
														{ backgroundColor: 'green' },
													]}
												/>
											)}
										</TouchableOpacity>
									)}
								</View>
							</View>
						);
					}
				})}
			</View>
		</View>
	);
};

export default FormUsers;

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
		width: '20%',
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

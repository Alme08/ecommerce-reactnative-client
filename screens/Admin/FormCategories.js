import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	TextInput,
	Alert,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory } from '../../redux/features/category/categoryActions';

const FormCategories = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { user } = useSelector(state => state.user);
	const { products } = useSelector(state => state.products);
	const { params } = useRoute();
	const [categoryKeyword, setCategoryKeyword] = useState('');
	return (
		<View>
			<Text style={styles.title}>Categorías</Text>
			<View style={styles.container}>
				<TextInput
					placeholder='Buscar cualquier Categoría...'
					placeholderTextColor='#ababab'
					style={styles.inputBox}
					value={categoryKeyword}
					onChangeText={Text => {
						setCategoryKeyword(Text);
					}}
				/>
				<TouchableOpacity style={styles.searchBtn}>
					<FontAwesome name='search' style={styles.icon} />
				</TouchableOpacity>
			</View>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'flex-end',
					marginRight: 10,
				}}
			>
				<TouchableOpacity
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						backgroundColor: 'green',
						padding: 8,
						borderRadius: 10,
						gap: 5,
					}}
					onPress={() => {
						navigation.navigate('Crear Categoría');
					}}
				>
					<Text style={{ color: '#fff' }}>Añadir</Text>
					<FontAwesome6 name='add' style={{ color: '#fff' }} />
				</TouchableOpacity>
			</View>

			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={{ width: '40%', fontWeight: 'bold' }}>Nombre</Text>
					<Text style={{ width: '40%', fontWeight: 'bold' }}>Productos</Text>
					<Text style={{ width: '20%' }}></Text>
				</View>
				{params.data.map(item => {
					let expReg = new RegExp(categoryKeyword, 'i');
					if (expReg.test(item.category)) {
						return (
							<View key={item._id} style={styles.body}>
								<Text style={{ width: '40%' }}>{item.category}</Text>
								<Text style={{ width: '40%' }}>
									{
										products.filter(product => product.category === item._id)
											.length
									}
								</Text>
								<View style={styles.actions}>
									<TouchableOpacity
										onPress={() => {
											navigation.navigate('Editar Categoría', {
												category: item,
											});
										}}
									>
										<Feather name='edit' style={styles.editButton} />
									</TouchableOpacity>
									{user.role === 'administrador' && (
										<TouchableOpacity
											onPress={() => {
												Alert.alert(
													'Alerta',
													'¿Estás seguro de que deseas eliminar esta categoría?',
													[
														{
															text: 'Cancel',
															onPress: () => console.log('Cancel Pressed'),
															style: 'cancel',
														},
														{
															text: 'OK',
															onPress: () => {
																dispatch(deleteCategory(item._id));
																navigation.navigate('Panel de administración');
															},
														},
													],
													{ cancelable: false }
												);
											}}
										>
											<AntDesign
												name='delete'
												style={[
													styles.deleteButton,
													{ backgroundColor: 'red' },
												]}
											/>
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

export default FormCategories;

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
		gap: 10,
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

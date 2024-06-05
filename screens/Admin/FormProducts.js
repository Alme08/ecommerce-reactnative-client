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
import { useDispatch } from 'react-redux';
import { changeProductStatus } from '../../redux/features/product/productActions';

const FormProducts = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { params } = useRoute();
	const [productKeyword, setProductKeyword] = useState('');
	const [products, setProducts] = useState(params.data);
	return (
		<View>
			<Text style={styles.title}>Productos</Text>
			<View style={styles.container}>
				<TextInput
					placeholder='Buscar cualquier producto...'
					placeholderTextColor='#ababab'
					style={styles.inputBox}
					value={productKeyword}
					onChangeText={Text => {
						setProductKeyword(Text);
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
						navigation.navigate('Crear Producto');
					}}
				>
					<Text style={{ color: '#fff' }}>Añadir</Text>
					<FontAwesome6 name='add' style={{ color: '#fff' }} />
				</TouchableOpacity>
			</View>

			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={{ width: '40%', fontWeight: 'bold' }}>Nombre</Text>
					<Text style={{ width: '20%', fontWeight: 'bold' }}>Precio</Text>
					<Text style={{ width: '20%', fontWeight: 'bold' }}>Stock</Text>
					<Text style={{ width: '20%' }}></Text>
				</View>
				{products.map(item => {
					let expReg = new RegExp(productKeyword, 'i');
					if (expReg.test(item.name)) {
						return (
							<View key={item._id} style={styles.body}>
								<Text style={{ width: '40%' }}>{item.name}</Text>
								<Text style={{ width: '20%' }}>
									${(Math.round(item.price * 100) / 100).toFixed(2)}
								</Text>
								<Text style={{ width: '20%' }}>{item.stock}</Text>
								<View style={styles.actions}>
									<TouchableOpacity
										onPress={() => {
											navigation.navigate('Editar Producto', { product: item });
										}}
									>
										<Feather name='edit' style={styles.editButton} />
									</TouchableOpacity>
									<TouchableOpacity
										onPress={() => {
											dispatch(changeProductStatus(item._id));
											setProducts(
												products.map(product => {
													if (product._id === item._id) {
														return { ...product, active: !item.active };
													}
													return product;
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
								</View>
							</View>
						);
					}
				})}
			</View>
		</View>
	);
};

export default FormProducts;

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

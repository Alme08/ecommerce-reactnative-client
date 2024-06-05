import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { createProduct } from '../../redux/features/product/productActions';
import InputBox from '../../components/Form/InputBox';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const CreateProduct = () => {
	const navigation = useNavigation();
	dispatch = useDispatch();
	const { categories } = useSelector(state => state.categories);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [stock, setStock] = useState('');
	const [category, setCategory] = useState('');
	const [images, setImages] = useState([]);

	const deleteImage = () => {
		setImages([]);
	};

	const handleSend = async () => {
		if (
			name == '' ||
			description == '' ||
			price == '' ||
			stock == '' ||
			category == '' ||
			images.length < 1
		) {
			alert('Por favor llene todos los campos');
			return;
		}
		const formData = {
			name,
			description,
			price,
			stock,
			category,
		};
		const loading = await dispatch(
			createProduct(formData, images[0].assets[0])
		);
		if (loading) {
			navigation.navigate('Panel de administración');
		}
	};
	return (
		<View>
			<Text style={styles.title}>Nuevo Producto</Text>
			<View style={styles.container}>
				<Text style={styles.textInput}>Nombre:</Text>
				<InputBox
					value={name}
					setValue={setName}
					placeholder={'Nombre del producto'}
				/>
				<Text style={styles.textInput}>Descripción:</Text>
				<InputBox
					value={description}
					setValue={setDescription}
					placeholder={'Descripción del producto'}
				/>
				<Text style={styles.textInput}>Precio:</Text>
				<InputBox
					value={price}
					setValue={setPrice}
					placeholder={'Precio del producto'}
					keyboardType={'numeric'}
				/>
				<Text style={styles.textInput}>Stock:</Text>
				<InputBox
					value={stock}
					setValue={setStock}
					placeholder={'Stock del producto'}
					keyboardType={'numeric'}
				/>
				<Text style={styles.textInput}>Categoría:</Text>
				<View style={styles.picker}>
					<Picker
						selectedValue={category}
						onValueChange={itemValue => setCategory(itemValue)}
					>
						<Picker.Item label='Selecciona una categoría' value='' />
						{categories.map(category => (
							<Picker.Item
								key={category._id}
								label={category.category}
								value={category._id}
							/>
						))}
					</Picker>
				</View>
				<Text style={styles.textInput}>Imágenes:</Text>
				<View style={{ flexDirection: 'row', gap: 10 }}>
					{images.map((img, index) => (
						<>
							<TouchableOpacity
								style={styles.deleteImage}
								onPress={deleteImage}
							>
								<AntDesign name='closecircle' color={'red'} size={20} />
							</TouchableOpacity>
							<Image
								style={styles.image}
								key={index}
								source={{ uri: img.assets[0].uri }}
							></Image>
						</>
					))}
					{images.length < 1 && (
						<TouchableOpacity
							style={styles.addImage}
							onPress={async () => {
								const result = await ImagePicker.launchImageLibraryAsync({
									mediaTypes: ImagePicker.MediaTypeOptions.All,
									allowsEditing: true,
									aspect: [4, 3],
									quality: 1,
									base64: true,
								});

								if (!result.canceled) {
									setImages([...images, result]);
									// setProfilePic(result.assets[0].uri);
									// setFile(result);
								}
							}}
						>
							<FontAwesome6 name='add' size={20} color='#fff' />
						</TouchableOpacity>
					)}
				</View>
			</View>

			<TouchableOpacity style={styles.button} onPress={handleSend}>
				<Text style={{ color: '#fff', fontSize: 16 }}>Añadir</Text>
			</TouchableOpacity>
		</View>
	);
};

export default CreateProduct;

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
		width: 100,
		borderRadius: 10,
	},
});

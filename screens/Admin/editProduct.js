import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import InputBox from '../../components/Form/InputBox';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {
	deleteProductImage,
	updateProduct,
	updateProductPic,
} from '../../redux/features/product/productActions';

const EditProduct = () => {
	const route = useRoute();
	const navigation = useNavigation();
	dispatch = useDispatch();
	const { product } = route.params;
	const { categories } = useSelector(state => state.categories);
	const [name, setName] = useState(product.name);
	const [description, setDescription] = useState(product.description);
	const [price, setPrice] = useState(product.price);
	const [stock, setStock] = useState(product.stock);
	const [category, setCategory] = useState(product.category);
	const [images, setImages] = useState(product.images);
	const [file, setFile] = useState(null);
	const [deletedImages, setDeletedImages] = useState([]);

	const deleteImage = img => {
		if (img.uri) {
			setImages(images.slice(0, -1));
			setFile(null);
		} else if (img._id) {
			setDeletedImages([...deletedImages, img._id]);
			const newImages = images.filter(image => image._id !== img._id);
			setImages(newImages);
		}
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

		let formData = {};
		if (name !== product.name) formData.name = name;
		if (description !== product.description) formData.description = description;
		if (price !== product.price) formData.price = price;
		if (stock !== product.stock) formData.stock = stock;
		if (category !== product.category) formData.category = category;
		if (Object.entries(formData).length > 0) {
			await dispatch(updateProduct(formData, product._id));
		}

		if (file !== null) {
			await dispatch(updateProductPic(file, product._id));
		}
		if (deletedImages.length > 0) {
			for (const imgId of deletedImages) {
				console.log('delete ' + imgId);
				await dispatch(deleteProductImage(product._id, imgId));
			}
		}

		navigation.navigate('Panel de administración');
	};
	return (
		<View>
			<Text style={styles.title}>Editar Producto</Text>
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
					value={price.toString()}
					setValue={setPrice}
					placeholder={'Precio del producto'}
					keyboardType={'numeric'}
				/>
				<Text style={styles.textInput}>Stock:</Text>
				<InputBox
					value={stock.toString()}
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
					{images.map((img, index) => {
						return (
							<View key={index}>
								<TouchableOpacity
									style={styles.deleteImage}
									onPress={() => {
										deleteImage(img);
									}}
								>
									<AntDesign name='closecircle' color={'red'} size={20} />
								</TouchableOpacity>
								<Image
									style={styles.image}
									source={{ uri: img.url || img.uri }}
								/>
							</View>
						);
					})}
					{file === null && images.length < 4 && (
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
									setImages([...images, result.assets[0]]);
									// setProfilePic(result.assets[0].uri);
									setFile(result.assets[0]);
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

export default EditProduct;

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

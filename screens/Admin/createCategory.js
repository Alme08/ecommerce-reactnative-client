import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import InputBox from '../../components/Form/InputBox';
import { useNavigation } from '@react-navigation/native';
import { createCategory } from '../../redux/features/category/categoryActions';

const CreateCategory = () => {
	const navigation = useNavigation();
	dispatch = useDispatch();
	const [name, setName] = useState('');

	const handleSend = async () => {
		if (name == '') {
			alert('Por favor llene todos los campos');
			return;
		}
		const formData = {
			category: name,
		};
		await dispatch(createCategory(formData));

		navigation.navigate('adminPanel');
	};
	return (
		<View>
			<Text style={styles.title}>Nueva Categoría</Text>
			<View style={styles.container}>
				<Text style={styles.textInput}>Nombre:</Text>
				<InputBox
					value={name}
					setValue={setName}
					placeholder={'Nombre de la categoría'}
				/>
			</View>

			<TouchableOpacity style={styles.button} onPress={handleSend}>
				<Text style={{ color: '#fff', fontSize: 16 }}>Añadir</Text>
			</TouchableOpacity>
		</View>
	);
};

export default CreateCategory;

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

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import InputBox from '../../components/Form/InputBox';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { updateUser } from '../../redux/features/auth/userActions';

const EditUser = () => {
	const route = useRoute();
	const navigation = useNavigation();
	dispatch = useDispatch();
	const { user } = route.params;
	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const [country, setCountry] = useState(user.country);
	const [city, setCity] = useState(user.city);
	const [address, setAddress] = useState(user.address);
	const [phone, setPhone] = useState(user.phone);
	const [role, setRole] = useState(user.role);

	const handleSend = async () => {
		if (
			name == '' ||
			email == '' ||
			country == '' ||
			city == '' ||
			address == '' ||
			phone == '' ||
			role == ''
		) {
			alert('Por favor llene los campos');
			return;
		}
		let formData = {
			name,
			address,
			city,
			country,
			phone,
			role,
		};

		await dispatch(updateUser(user._id, formData));
		navigation.navigate('Panel de administración');
	};

	return (
		<View>
			<Text style={styles.title}>Editar Usuario</Text>
			<View style={styles.container}>
				<Text style={styles.textInput}>Nombre:</Text>
				<InputBox
					value={name}
					setValue={setName}
					placeholder={'Nombre del usuario'}
				/>
				<Text style={styles.textInput}>Email:</Text>
				<InputBox
					value={email}
					setValue={setEmail}
					editable={false}
					placeholder={'Email del usuario'}
				/>
				<Text style={styles.textInput}>País:</Text>
				<InputBox
					value={country}
					setValue={setCountry}
					placeholder={'País del usuario'}
				/>
				<Text style={styles.textInput}>Ciudad:</Text>
				<InputBox
					value={city}
					setValue={setCity}
					placeholder={'Ciudad del usuario'}
				/>
				<Text style={styles.textInput}>Dirección:</Text>
				<InputBox
					value={address}
					setValue={setAddress}
					placeholder={'Dirección del usuario'}
				/>
				<Text style={styles.textInput}>Teléfono:</Text>
				<InputBox
					value={phone}
					setValue={setPhone}
					placeholder={'Teléfono del usuario'}
				/>
				<Text style={styles.textInput}>Rol:</Text>
				<View style={styles.picker}>
					<Picker
						selectedValue={role}
						onValueChange={itemValue => setRole(itemValue)}
					>
						<Picker.Item label='Usuario' value='user' />
						<Picker.Item label='Trabajador' value='employee' />
						<Picker.Item label='Administrador' value='admin' />
					</Picker>
				</View>
			</View>

			<TouchableOpacity style={styles.button} onPress={handleSend}>
				<Text style={{ color: '#fff', fontSize: 16 }}>Editar</Text>
			</TouchableOpacity>
		</View>
	);
};

export default EditUser;

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

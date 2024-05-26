import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import InputBox from '../../components/Form/InputBox';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/features/auth/userActions';
import { useReduxStateHook } from '../../hooks/customHook';

const Register = ({ navigation }) => {
	const dispatch = useDispatch();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [phone, setPhone] = useState('');
	const [answer, setAnswer] = useState('');

	//login function
	const handleRegister = () => {
		if (
			!email ||
			!password ||
			!name ||
			!address ||
			!city ||
			!phone ||
			!answer
		) {
			alert('Please fill all the fields');
		}
		const formData = {
			email,
			password,
			name,
			address,
			city,
			phone,
			answer,
			country: 'Venezuela',
		};
		dispatch(register(formData));
		// navigation.navigate('login');
	};

	const loading = useReduxStateHook(navigation, 'login');
	return (
		<View style={styles.container}>
			<Text style={styles.headerText}>Crea una cuenta</Text>
			<InputBox
				placeholder={'Ingresa tu nombre'}
				value={name}
				setValue={setName}
				autoComplete={'name'}
			/>
			<InputBox
				placeholder={'Ingresa tu correo electrónico'}
				value={email}
				setValue={setEmail}
				autoComplete={'email'}
			/>
			<InputBox
				placeholder={'Ingresa tu contraseña'}
				value={password}
				setValue={setPassword}
				secureTextEntry={true}
			/>
			<InputBox
				placeholder={'Ingresa tu dirección'}
				value={address}
				setValue={setAddress}
				autoComplete={'address-line1'}
			/>
			<InputBox
				placeholder={'Ingresa tu ciudad'}
				value={city}
				setValue={setCity}
				autoComplete={'country'}
			/>
			<InputBox
				placeholder={'Ingrese tu número de contacto'}
				value={phone}
				setValue={setPhone}
				autoComplete={'tel'}
			/>
			<InputBox
				placeholder={'Ingresa tu comida favorita'}
				value={answer}
				setValue={setAnswer}
			/>
			<View style={styles.btnContainer}>
				<TouchableOpacity style={styles.loginBtn} onPress={handleRegister}>
					<Text style={styles.loginBtnText}>Registrate</Text>
				</TouchableOpacity>
				<Text>
					Si ya tienes una cuenta,{' '}
					<Text
						onPress={() => navigation.navigate('login')}
						style={{ color: 'blue' }}
					>
						Inicia sesion
					</Text>
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
	},
	headerText: {
		fontSize: 30,
		fontWeight: '600',
		marginBottom: 20,
		textAlign: 'center'
	},
	btnContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	loginBtn: {
		backgroundColor: '#000',
		width: '80%',
		justifyContent: 'center',
		height: 40,
		borderRadius: 10,
		marginVertical: 20,
	},
	loginBtnText: {
		color: '#fff',
		textAlign: 'center',
		textTransform: 'uppercase',
		fontWeight: '500',
		fontSize: 16,
	},
});
export default Register;

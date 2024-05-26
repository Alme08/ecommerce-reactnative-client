import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import InputBox from '../../components/Form/InputBox';

//redux hooks
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/features/auth/userActions';
import { useReduxStateHook } from '../../hooks/customHook';

const Login = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	//hooks
	const dispatch = useDispatch();
	//global state
	const loading = useReduxStateHook(navigation, 'home');

	//login function
	const handleLogin = () => {
		if (!email || !password) {
			return alert('Please fill all the fields');
		}
		dispatch(login(email, password));
	};

	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>Loading...</Text>
			</View>
		);
	}
	return (
		<View style={styles.container}>
			<Text style={styles.headerText}>Inicia sesión</Text>
			<InputBox
				placeholder={'Ingresa tu correo'}
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
			<View style={styles.btnContainer}>
				<TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
					<Text style={styles.loginBtnText}>Ingresar</Text>
				</TouchableOpacity>
				<Text>
					Crear una cuenta,{' '}
					<Text
						onPress={() => navigation.navigate('register')}
						style={{ color: 'blue' }}
					>
						Registrate
					</Text>
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
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

export default Login;

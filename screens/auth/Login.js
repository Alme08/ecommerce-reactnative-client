import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	ImageBackground,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import InputBox from '../../components/Form/InputBox';
import background from '../../assets/background.jpg';

//redux hooks
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/features/auth/userActions';
import { useReduxStateHook } from '../../hooks/customHook';

const Login = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	//hooks
	const dispatch = useDispatch();
	//global state
	const loading = useReduxStateHook(navigation, 'home');

	//login function
	const handleLogin = () => {
		if (!email || !password) {
			return alert('Please fill all the fields');
		}
		const err = dispatch(login(email, password));
		setError(err);
	};

	if (loading && error === null) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>Cargando...</Text>
			</View>
		);
	}
	return (
		<View style={styles.container}>
			<ImageBackground source={background} style={styles.backgroundImage}>
				<View style={styles.containerForm}>
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
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		height: '100%',
	},
	backgroundImage: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
	},
	containerForm: {
		width: '95%',
		margin: 'auto',
		paddingVertical: 30,
		backgroundColor: 'rgba(255, 255, 255, 0.8)',
		borderRadius: 20,
	},
	headerText: {
		fontSize: 30,
		fontWeight: '600',
		marginBottom: 20,
		textAlign: 'center',
	},
	btnContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	loginBtn: {
		backgroundColor: '#ce7100',
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

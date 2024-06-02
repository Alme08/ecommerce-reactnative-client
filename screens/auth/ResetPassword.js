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
import { useRoute } from '@react-navigation/native';

//redux hooks
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, login } from '../../redux/features/auth/userActions';
import { useReduxStateHook } from '../../hooks/customHook';

const ResetPassword = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordValid, setPasswordValid] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	//hooks
	const dispatch = useDispatch();

	const validatePassword = password => {
		const passwordRegex =
			/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.])[A-Za-z\d!@#$%^&*.]{7,}$/;
		return passwordRegex.test(password);
	};
	const handlePasswordChange = text => {
		setPassword(text);
		setPasswordValid(validatePassword(text));
	};

	//login function
	const handleLogin = async () => {
		if (!email || !password || !repeatPassword) {
			return alert('Por favor completa todos los campos');
		}
		if (password !== repeatPassword) {
			return alert('Las contraseñas no coinciden');
		}
		if (!passwordValid) {
			alert('Por favor ingrese una contraseña válida');
			return;
		}
		const formData = {
			email,
			newPassword: password,
		};
		dispatch(forgotPassword(formData));

		const loading = useReduxStateHook(navigation, 'login');
	};
	return (
		<View style={styles.container}>
			<ImageBackground source={background} style={styles.backgroundImage}>
				<View style={styles.containerForm}>
					<Text style={styles.headerText}>Cambiar contraseña</Text>
					<InputBox
						placeholder={'Ingresa tu correo'}
						value={email}
						setValue={setEmail}
						autoComplete={'email'}
					/>
					<InputBox
						placeholder={'Ingresa tu nueva contraseña'}
						value={password}
						setValue={handlePasswordChange}
						secureTextEntry={true}
					/>
					<Text style={{ color: 'red', textAlign: 'center' }}>
						{passwordValid || password === ''
							? ''
							: 'Debe tener más de 6 caracteres, con 1 número, 1 letra mayúscula y 1 carácter especial.'}
					</Text>
					<InputBox
						placeholder={'Repite tu nueva contraseña'}
						value={repeatPassword}
						setValue={setRepeatPassword}
						secureTextEntry={true}
					/>
					<Text style={{ color: 'red', textAlign: 'center' }}>
						{password === repeatPassword || repeatPassword === ''
							? ''
							: 'Las contraseñas no coindicen.'}
					</Text>
					<View style={styles.btnContainer}>
						<TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
							<Text style={styles.loginBtnText}>Ingresar</Text>
						</TouchableOpacity>
						<Text>
							¿Recordaste tu contraseña?{' '}
							<Text
								style={{ color: 'blue' }}
								onPress={() => navigation.navigate('login')}
							>
								Iniciar sesión
							</Text>
						</Text>
					</View>
				</View>
			</ImageBackground>
		</View>
	);
};

export default ResetPassword;

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
		paddingHorizontal: 10,
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

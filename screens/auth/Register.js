import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ImageBackground,
} from 'react-native';
import React, { useState } from 'react';
import InputBox from '../../components/Form/InputBox';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/features/auth/userActions';
import { useReduxStateHook } from '../../hooks/customHook';
import background from '../../assets/background.jpg';

const Register = ({ navigation }) => {
	const dispatch = useDispatch();
	const [name, setName] = useState('');
	const [nameValid, setNameValid] = useState(true);
	const [email, setEmail] = useState('');
	const [emailValid, setEmailValid] = useState(true);
	const [password, setPassword] = useState('');
	const [passwordValid, setPasswordValid] = useState(true);
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [phone, setPhone] = useState('');
	const [phoneValid, setPhoneValid] = useState(true);

	const validateName = name => {
		const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ' ]{2,}$/;
		return nameRegex.test(name);
	};
	const handleNameChange = text => {
		setName(text);
		setNameValid(validateName(text));
	};

	const validateEmail = email => {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return emailRegex.test(email);
	};
	const handleEmailChange = text => {
		setEmail(text);
		setEmailValid(validateEmail(text));
	};

	const validatePassword = password => {
		const passwordRegex =
			/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.])[A-Za-z\d!@#$%^&*.]{7,}$/;
		return passwordRegex.test(password);
	};
	const handlePasswordChange = text => {
		setPassword(text);
		setPasswordValid(validatePassword(text));
	};

	const validatePhone = phone => {
		const phoneRegex = /^(\+?\d{1,3}[- ]?)?(\(?\d{3}\)?[- ]?)?[\d- ]{7,10}$/;
		return phoneRegex.test(phone);
	};
	const handlePhoneChange = text => {
		setPhone(text);
		setPhoneValid(validatePhone(text));
	};

	//login function
	const handleRegister = async () => {
		if (!email || !password || !name || !address || !city || !phone) {
			alert('Por favor llena todos los campos');
			return;
		}
		if (!nameValid) {
			alert('Por favor ingrese un nombre válido');
			return;
		}
		if (!emailValid) {
			alert('Por favor ingrese un email válido');
			return;
		}
		if (!passwordValid) {
			alert('Por favor ingrese una contraseña válida');
			return;
		}
		if (!phoneValid) {
			alert('Por favor ingrese un número de teléfono válido');
			return;
		}
		const formData = {
			email,
			password,
			name,
			address,
			city,
			phone,
			country: 'Venezuela',
		};

		dispatch(register(formData));
		// navigation.navigate('login');
	};

	const loading = useReduxStateHook(navigation, 'login');
	return (
		<View style={styles.container}>
			<ImageBackground source={background} style={styles.backgroundImage}>
				<View style={styles.containerForm}>
					<Text style={styles.headerText}>Crea una cuenta</Text>
					<InputBox
						placeholder={'Ingresa tu nombre'}
						value={name}
						setValue={handleNameChange}
						autoComplete={'name'}
					/>
					<Text style={styles.validationText}>
						{nameValid || name === ''
							? ''
							: 'Debe tener al menos 2 caracteres y contener sólo letras.'}
					</Text>
					<InputBox
						placeholder={'Ingresa tu correo electrónico'}
						value={email}
						setValue={handleEmailChange}
						autoComplete={'email'}
					/>
					<Text style={styles.validationText}>
						{emailValid || email === '' ? '' : 'Email no válido.'}
					</Text>
					<InputBox
						placeholder={'Ingresa tu contraseña'}
						value={password}
						setValue={handlePasswordChange}
						secureTextEntry={true}
					/>
					<Text style={styles.validationText}>
						{passwordValid || password === ''
							? ''
							: 'Debe tener más de 6 caracteres, con 1 número, 1 letra mayúscula y 1 carácter especial.'}
					</Text>
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
						setValue={handlePhoneChange}
						autoComplete={'tel'}
					/>
					<Text style={styles.validationText}>
						{phoneValid || phone === '' ? '' : 'Invalid phone number.'}
					</Text>
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
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// alignItems: 'center',
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
	validationText: {
		color: 'red',
		fontSize: 12,
		textAlign: 'center',
	},
});
export default Register;

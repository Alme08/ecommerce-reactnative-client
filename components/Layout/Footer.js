import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useReduxStateHook } from '../../hooks/customHook';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/features/auth/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Footer = () => {
	const route = useRoute();
	const navigation = useNavigation();
	const loading = useReduxStateHook(navigation, 'login');
	const dispatch = useDispatch();

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.menuContainer}
				onPress={() => navigation.navigate('home')}
			>
				<Feather
					style={[styles.icon, route.name === 'home' && styles.active]}
					name='home'
				/>
				<Text style={[styles.iconText, route.name === 'home' && styles.active]}>
					Inicio
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.menuContainer}
				onPress={() => navigation.navigate('Cuenta')}
			>
				<Feather
					style={[styles.icon, route.name === 'Cuenta' && styles.active]}
					name='user'
				/>
				<Text
					style={[styles.iconText, route.name === 'Cuenta' && styles.active]}
				>
					Cuenta
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.menuContainer}
				onPress={() => navigation.navigate('Carrito')}
			>
				<Feather
					style={[styles.icon, route.name === 'Carrito' && styles.active]}
					name='shopping-cart'
				/>
				<Text style={[styles.iconText, route.name === 'Carrito' && styles.active]}>
					Carrito
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.menuContainer}
				onPress={async () => {
					dispatch(logout());
					await AsyncStorage.removeItem('@auth');
				}}
			>
				<Feather style={styles.icon} name='log-out' />
				<Text style={styles.iconText}>Salir</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 10,
	},
	menuContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	icon: {
		fontSize: 20,
		color: '#000',
	},
	iconText: {
		color: '#000',
		fontSize: 14,
	},
	active: {
		color: '#ce7100',
	},
});

export default Footer;

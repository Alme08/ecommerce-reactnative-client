import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Layout from '../../components/Layout/Layout';
import { AntDesign } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const Account = ({ navigation }) => {
	const { user } = useSelector(state => state.user);

	return (
		<Layout>
			<View style={styles.container}>
				<Image
					source={{
						uri: user.profilePic
							? user.profilePic.url
							: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
					}}
					style={styles.image}
				/>
				<View style={{ justifyContent: 'center', alignItems: 'center' }}>
					<Text style={styles.name}>Hola, {user.name}</Text>
					<Text>E-mail: {user.email}</Text>
					<Text>Número: {user.phone}</Text>
				</View>
				<View style={styles.btnContainer}>
					<Text style={styles.heading}>Configuración</Text>
					<TouchableOpacity
						style={styles.btn}
						onPress={() => navigation.navigate('profile', { user: user })}
					>
						<AntDesign name='edit' style={styles.btnText} />
						<Text style={styles.btnText}>Editar Perfil</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.btn}
						onPress={() => navigation.navigate('myorders', { id: user._id })}
					>
						<AntDesign name='bars' style={styles.btnText} />
						<Text style={styles.btnText}>Mis Ordenes</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.btn}
						onPress={() => navigation.navigate('notifications')}
					>
						<AntDesign name='bells' style={styles.btnText} />
						<Text style={styles.btnText}>Notificaciones</Text>
					</TouchableOpacity>
					{user.role === 'admin' && (
						<TouchableOpacity
							style={styles.btn}
							onPress={() =>
								navigation.navigate('adminPanel', { id: user._id })
							}
						>
							<AntDesign name='laptop' style={styles.btnText} />
							<Text style={styles.btnText}>Panel de Administrador</Text>
						</TouchableOpacity>
					)}
				</View>
			</View>
		</Layout>
	);
};

export default Account;

const styles = StyleSheet.create({
	container: {
		marginVertical: 20,
		alignItems: 'center',
	},
	image: {
		height: 100,
		width: 100,
		// resizeMode: 'cover',
		borderRadius: 100,
		// resizeMode: 'contain',
	},
	name: {
		marginTop: 10,
		fontSize: 20,
	},
	btnContainer: {
		padding: 10,
		backgroundColor: '#fff',
		margin: 10,
		marginVertical: 20,
		elevation: 5,
		borderRadius: 10,
		paddingBottom: 30,
		width: '100%',
	},
	heading: {
		fontSize: 20,
		fontWeight: 'bold',
		paddingBottom: 10,
		textAlign: 'center',
		borderBottomWidth: 1,
		borderColor: 'lightgray',
	},
	btn: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 10,
		padding: 5,
	},
	btnText: {
		fontSize: 15,
		marginRight: 10,
	},
});

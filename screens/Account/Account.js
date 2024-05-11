import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Layout from '../../components/Layout/Layout';
import { userData } from '../../data/userData';
import { AntDesign } from '@expo/vector-icons';

const Account = ({ navigation }) => {
	return (
		<Layout>
			<View style={styles.container}>
				<Image source={{ uri: userData.profilePic }} style={styles.image} />
				<View style={{ justifyContent: 'center', alignItems: 'center' }}>
					<Text style={styles.name}>Hi, {userData.name}</Text>
					<Text>email: {userData.email}</Text>
					<Text>contact: {userData.contact}</Text>
				</View>
				<View style={styles.btnContainer}>
					<Text style={styles.heading}>Account settings</Text>
					<TouchableOpacity
						style={styles.btn}
						onPress={() => navigation.navigate('profile', { id: userData._id })}
					>
						<AntDesign name='edit' style={styles.btnText} />
						<Text style={styles.btnText}>Edit Profile</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.btn}
						onPress={() =>
							navigation.navigate('myorders', { id: userData._id })
						}
					>
						<AntDesign name='bars' style={styles.btnText} />
						<Text style={styles.btnText}>My Orders</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.btn}
						onPress={() => navigation.navigate('notifications')}
					>
						<AntDesign name='bells' style={styles.btnText} />
						<Text style={styles.btnText}>Notifications</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.btn}
						onPress={() =>
							navigation.navigate('adminPanel', { id: userData._id })
						}
					>
						<AntDesign name='laptop' style={styles.btnText} />
						<Text style={styles.btnText}>Admin Panel</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Layout>
	);
};

export default Account;

const styles = StyleSheet.create({
	container: {
		marginVertical: 20,
	},
	image: {
		height: 100,
		width: '100%',
		resizeMode: 'contain',
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

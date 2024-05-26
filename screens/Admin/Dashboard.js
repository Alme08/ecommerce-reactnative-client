import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Layout from '../../components/Layout/Layout';
import { AntDesign } from '@expo/vector-icons';

const Dashboard = () => {
	return (
		<Layout>
			<View style={styles.main}>
				<Text style={styles.heading}>Dashboard</Text>
				<View style={styles.btnContainer}>
					<TouchableOpacity style={styles.btn}>
						<AntDesign name='edit' style={styles.icon} />
						<Text style={styles.btnText}>Manage Products</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.btn}>
						<AntDesign name='edit' style={styles.icon} />
						<Text style={styles.btnText}>Manage Categories</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.btn}>
						<AntDesign name='user' style={styles.icon} />
						<Text style={styles.btnText}>Manage Users</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.btn}>
						<AntDesign name='bars' style={styles.icon} />
						<Text style={styles.btnText}>Manage Orders</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Layout>
	);
};

export default Dashboard;

const styles = StyleSheet.create({
	main: {
		backgroundColor: 'lightgray',
		height: '96%',
	},
	heading: {
		backgroundColor: '#000',
		color: '#fff',
		textAlign: 'center',
		padding: 10,
		fontSize: 20,
		margin: 10,
		borderRadius: 5,
		fontWeight: 'bold',
	},
	btnContainer: {
		margin: 10,
	},
	btn: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
		padding: 20,
		borderRadius: 10,
		elevation: 10,
		marginBottom: 20,
	},
	btnText: {
		fontSize: 18,
	},
	icon: {
		fontSize: 20,
		marginRight: 10,
		marginLeft: 10,
	},
});

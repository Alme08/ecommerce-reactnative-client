import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback } from 'react';
import Layout from '../../components/Layout/Layout';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductData } from '../../redux/features/product/productActions';
import { getAllCategoryData } from '../../redux/features/category/categoryActions';
import { getAllOrdersData } from '../../redux/features/orders/orderActions';
import { getAllUsersData } from '../../redux/features/auth/userActions';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const Dashboard = () => {
	const navigation = useNavigation();
	// const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const { products } = useSelector(state => state.products);
	const { categories } = useSelector(state => state.categories);
	const { orders } = useSelector(state => state.orders);
	const { users } = useSelector(state => state.user);

	useFocusEffect(
		useCallback(() => {
			// get all users
			dispatch(getAllUsersData());
			// get all products
			dispatch(getAllProductData());
			// get all categories
			dispatch(getAllCategoryData());
			// get all orders
			dispatch(getAllOrdersData());
		}, [dispatch])
	);

	return (
		<Layout>
			<View style={styles.main}>
				<Text style={styles.heading}>Dashboard</Text>
				<View style={styles.btnContainer}>
					<TouchableOpacity
						style={styles.btn}
						onPress={() => {
							navigation.navigate('productForm', {
								data: products,
							});
						}}
					>
						<AntDesign name='edit' style={styles.icon} />
						<Text style={styles.btnText}>Productos {products?.length}</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.btn}
						onPress={() => {
							navigation.navigate('categoryForm', {
								data: categories,
							});
						}}
					>
						<AntDesign name='edit' style={styles.icon} />
						<Text style={styles.btnText}>Categorias {categories?.length}</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.btn}
						onPress={() => {
							navigation.navigate('userForm', {
								data: users,
							});
						}}
					>
						<AntDesign name='user' style={styles.icon} />
						<Text style={styles.btnText}>Usuarios {users?.length}</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.btn}
						onPress={() => {
							navigation.navigate('adminForm', {
								data: orders,
							});
						}}
					>
						<AntDesign name='bars' style={styles.icon} />
						<Text style={styles.btnText}>Ordenes {orders?.length}</Text>
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

import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import About from './screens/About';
import ProductDetails from './screens/ProductDetails';
import Cart from './screens/Cart';
import Checkout from './screens/Checkout';
import Payment from './screens/Payment';
import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import Account from './screens/Account/Account';
import Notifications from './screens/Account/Notifications';
import Profile from './screens/Account/Profile';
import MyOrders from './screens/Account/MyOrders';
import Dashboard from './screens/Admin/Dashboard';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormProducts from './screens/Admin/FormProducts';
import CreateProduct from './screens/Admin/createProduct';
import EditProduct from './screens/Admin/editProduct';
import FormCategories from './screens/Admin/FormCategories';
import CreateCategory from './screens/Admin/createCategory';
import EditCategory from './screens/Admin/editCategory';
import FormUsers from './screens/Admin/FormUsers';
import EditUser from './screens/Admin/editUser';
import FormOrders from './screens/Admin/FormOrders';
import EditOrder from './screens/Admin/editOrder';
import ResetPassword from './screens/auth/ResetPassword';

//Routes
const Stack = createNativeStackNavigator();
export default function Main() {
	const [isAuth, setIsAuth] = useState(null);
	const [loading, setLoading] = useState(true);
	//get user
	useEffect(() => {
		const getUserLocalData = async () => {
			let data = await AsyncStorage.getItem('@auth');
			setIsAuth(data);
			console.log('user login data ==>', data);
			setLoading(false);
		};
		getUserLocalData();
	}, []);
	if (loading) {
		return <Text>Cargando...</Text>;
	}
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={isAuth ? 'home' : 'login'}>
				<Stack.Screen
					name='home'
					component={Home}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='about'
					component={About}
					options={{ headerShown: false }}
				/>

				<Stack.Screen name='Detalles de Producto' component={ProductDetails} />
				<Stack.Screen name='Verificar Pagos' component={Checkout} />
				<Stack.Screen name='Mis Ordenes' component={MyOrders} />
				<Stack.Screen name='Perfil' component={Profile} />
				<Stack.Screen name='Notificaciones' component={Notifications} />
				<Stack.Screen name='Panel de administración' component={Dashboard} />
				<Stack.Screen name='Pagar' component={Payment} />
				<Stack.Screen name='Cuenta' component={Account} />
				<Stack.Screen name='Carrito' component={Cart} />
				<Stack.Screen name='Formulario de Productos' component={FormProducts} />
				<Stack.Screen name='Crear Producto' component={CreateProduct} />
				<Stack.Screen name='Editar Producto' component={EditProduct} />
				<Stack.Screen name='Formulario de Categorías' component={FormCategories} />
				<Stack.Screen name='Crear Categoría' component={CreateCategory} />
				<Stack.Screen name='Editar Categoría' component={EditCategory} />
				<Stack.Screen name='Formulario de Usuarios' component={FormUsers} />
				<Stack.Screen name='Editar Usuario' component={EditUser} />
				<Stack.Screen name='Formulario de Ordenes' component={FormOrders} />
				<Stack.Screen name='Editar Orden' component={EditOrder} />
				<Stack.Screen
					name='login'
					component={Login}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name='register'
					component={Register}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name='resetPassword'
					component={ResetPassword}
					options={{
						headerShown: false,
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

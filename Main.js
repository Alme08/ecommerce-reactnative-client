import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
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

				<Stack.Screen name='productDetails' component={ProductDetails} />
				<Stack.Screen name='checkout' component={Checkout} />
				<Stack.Screen name='myorders' component={MyOrders} />
				<Stack.Screen name='profile' component={Profile} />
				<Stack.Screen name='notifications' component={Notifications} />
				<Stack.Screen name='adminPanel' component={Dashboard} />
				<Stack.Screen name='payment' component={Payment} />
				<Stack.Screen name='account' component={Account} />
				<Stack.Screen name='cart' component={Cart} />
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
			</Stack.Navigator>
		</NavigationContainer>
	);
}

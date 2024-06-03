import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Layout from '../../components/Layout/Layout';

const Notifications = () => {
	return (
		<Layout>
			<View style={styles.container}>
				<Text>Oops! No tienes ninguna notificación.</Text>
			</View>
		</Layout>
	);
};

export default Notifications;

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
	}
});

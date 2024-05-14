import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Button,
} from 'react-native';
import Constants from 'expo-constants';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Entypo } from '@expo/vector-icons';

const Header = ({ keyword, setKeyword }) => {
	return (
		<View
			style={{
				height: 120,
				marginTop: Constants.statusBarHeight,
			}}
		>
			<View style={styles.container}>
				<TouchableOpacity
					style={{
						padding: 3,
						backgroundColor: '#e7e7e7',
						borderRadius: 100,
					}}
				>
					<Entypo name='menu' size={30} />
				</TouchableOpacity>
				<Text
					style={{
						fontWeight: 'bold',
						textAlign: 'center',
						fontSize: 20,
						color: '#132452',
					}}
				>
					Variedades Eliza
				</Text>
				<View style={{ height: 20, width: 20 }} />
			</View>
			<View style={styles.container}>
				<TextInput
					placeholder='Search any product...'
					placeholderTextColor='#ababab'
					style={styles.inputBox}
					value={keyword}
					onChangeText={Text => {
						setKeyword(Text);
					}}
				/>
				<TouchableOpacity style={styles.searchBtn}>
					<FontAwesome name='search' style={styles.icon} />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		display: 'flex',
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 15,
		marginTop: 20,
	},
	inputBox: {
		borderWidth: 0,
		width: '100%',
		position: 'absolute',
		left: 15,
		height: 40,
		color: '#000000',
		backgroundColor: '#ffffff',
		paddingLeft: 45,
		fontSize: 16,
		borderRadius: 10,
		shadowColor: '#171717',
		elevation: 3,
	},
	searchBtn: {
		position: 'absolute',
		right: '95%',
	},
	icon: {
		color: '#ababab',
		fontSize: 18,
	},
});

export default Header;

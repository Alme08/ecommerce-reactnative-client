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

const Header = ({ keyword, setKeyword }) => {
	return (
		<View style={styles.container}>
			<View style={styles.section}>
				<Text style={styles.title}>
					Variedades Eliza
				</Text>
				<View style={{ height: 20, width: 20 }} />
			</View>
			<View style={styles.section}>
				<TextInput
					placeholder='Buscar cualquier producto...'
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
		height: 120,
		marginTop: Constants.statusBarHeight,
	},
	section: {
		width: '100%',
		display: 'flex',
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 15,
		marginTop: 0,
		backgroundColor: "orange",
	},
	title: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 30,
		color: 'white',
		fontStyle: 'italic'
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

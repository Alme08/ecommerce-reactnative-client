import {
	ScrollView,
	StyleSheet,
	Text,
	View,
	Image,
	Pressable,
	TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { userData } from '../../data/userData';
import InputBox from '../../components/Form/InputBox';
import { useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import {
	updateProfile,
	updateProfilePic,
} from '../../redux/features/auth/userActions';
import { useReduxStateHook } from '../../hooks/customHook';
import * as ImagePicker from 'expo-image-picker';
import FormData from 'form-data';

const Profile = ({ navigation }) => {
	const dispatch = useDispatch();
	const { params } = useRoute();

	const user = params.user;
	const [email, setEmail] = useState(user.email);
	const [profilePic, setProfilePic] = useState(user.profilePic.url);
	const [name, setName] = useState(user.name);
	const [address, setAddress] = useState(user.address);
	const [city, setCity] = useState(user.city);
	const [phone, setPhone] = useState(user.phone);
	const [file, setFile] = useState('');

	//update
	const handleUpdate = () => {
		if (!email || !name || !address || !city || !phone) {
			alert('Please fill all the fields');
		}
		const formData = {
			email,
			name,
			address,
			city,
			phone,
		};
		if (profilePic !== user.profilePic.url) {
			dispatch(updateProfilePic(file.assets[0]));
		}
		dispatch(updateProfile(formData));
	};

	const loading = useReduxStateHook(navigation, 'login');
	return (
		<Layout>
			<View style={styles.container}>
				<ScrollView>
					<View style={styles.imageContainer}>
						<Image style={styles.image} source={{ uri: profilePic }} />
						<Pressable
							onPress={async () => {
								result = await ImagePicker.launchImageLibraryAsync({
									mediaTypes: ImagePicker.MediaTypeOptions.All,
									allowsEditing: true,
									aspect: [4, 3],
									quality: 1,
									base64: true,
								});

								if (!result.canceled) {
									setProfilePic(result.assets[0].uri);
									setFile(result);
								}
							}}
						>
							<Text style={{ color: 'red' }}>Update your profile pic</Text>
						</Pressable>
					</View>
					<InputBox
						value={name}
						setValue={setName}
						placeholder={'Enter your name'}
						autoComplete={'name'}
					/>
					<InputBox
						value={email}
						setValue={setEmail}
						placeholder={'Enter your email'}
						autoComplete={'email'}
					/>
					<InputBox
						value={address}
						setValue={setAddress}
						placeholder={'Enter your address'}
						autoComplete={'address-line1'}
					/>
					<InputBox
						value={city}
						setValue={setCity}
						placeholder={'Enter your city'}
						autoComplete={'country'}
					/>
					<InputBox
						value={phone}
						setValue={setPhone}
						placeholder={'Enter your contact number'}
						autoComplete={'tel'}
					/>
					<TouchableOpacity style={styles.btnUpdate} onPress={handleUpdate}>
						<Text style={styles.btnUpdateText}>UPDATE PROFILE</Text>
					</TouchableOpacity>
				</ScrollView>
			</View>
		</Layout>
	);
};

export default Profile;

const styles = StyleSheet.create({
	container: {
		marginVertical: 20,
	},
	imageContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		height: 100,
		width: 100,
		// resizeMode: 'cover',
		borderRadius: 100,
	},
	btnUpdate: {
		backgroundColor: '#000',
		height: 40,
		borderRadius: 20,
		marginHorizontal: 30,
		justifyContent: 'center',
		marginTop: 10,
	},
	btnUpdateText: {
		color: '#fff',
		fontSize: 18,
		textAlign: 'center',
	},
});

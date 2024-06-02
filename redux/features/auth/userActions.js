import { server } from '../../store';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// action login
export const login = (email, password) => async dispatch => {
	try {
		dispatch({
			type: 'loginRequest',
		});
		const { data } = await axios.post(
			`${server}/user/login`,
			{ email, password },
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		dispatch({
			type: 'loginSuccess',
			payload: data,
		});
		await AsyncStorage.setItem('@auth', data?.token);
		return null;
	} catch (error) {
		dispatch({
			type: 'loginFail',
			payload: error.response.data.message,
		});

		return error;
	}
};

//REGISTER
export const register = formData => async dispatch => {
	try {
		dispatch({
			type: 'registerRequest',
		});
		const { data } = await axios.post(`${server}/user/register`, formData, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		dispatch({
			type: 'registerSuccess',
			payload: data.message,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: 'registerFail',
			payload: error.response.data.message,
		});
	}
};

// GET USER DATA ACTION

export const getUserData = () => async dispatch => {
	try {
		dispatch({
			type: 'getUserDataRequest',
		});
		const { data } = await axios.get(`${server}/user/profile`);
		dispatch({
			type: 'getUserDataSuccess',
			payload: data?.user,
		});
	} catch (error) {
		dispatch({
			type: 'getUserDataFail',
			payload: error.response.data.message,
		});
	}
};

// LOGOUT ACTION
export const logout = () => async dispatch => {
	try {
		dispatch({
			type: 'logoutRequest',
		});
		const { data } = await axios.get(`${server}/user/logout`);
		dispatch({
			type: 'logoutSuccess',
			payload: data?.message,
		});
	} catch (error) {
		dispatch({
			type: 'logoutFail',
			payload: error.response.data.message,
		});
	}
};

// UPDATE PROFILE ACTION
export const updateProfile = formData => async dispatch => {
	try {
		dispatch({
			type: 'updateProfileRequest',
		});
		const { data } = await axios.put(
			`${server}/user/profile-update/`,
			formData
		);
		dispatch({
			type: 'updateProfileSuccess',
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: 'updateProfileFail',
			payload: error.response.data.message,
		});
	}
};

// UPDATE PROFILE PIC ACTION
export const updateProfilePic = file => async dispatch => {
	try {
		let formData = new FormData();
		formData.append('file', {
			uri: file.uri,
			type: file.mimeType,
			name: file.fileName,
		});
		dispatch({
			type: 'updateProfilePicRequest',
		});
		const { data } = await axios.post(
			`${server}/user/update-profile-pic`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
		);
		dispatch({
			type: 'updateProfilePicSuccess',
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: 'updateProfilePicFail',
			payload: error.response.data.message,
		});
	}
};

// GET ALL USERS ACTION
export const getAllUsersData = keyword => async dispatch => {
	try {
		dispatch({
			type: 'getAllUsersDataRequest',
		});
		const { data } = await axios.get(`${server}/user/get-all`, {
			params: {
				keyword: keyword,
			},
		});
		dispatch({
			type: 'getAllUsersDataSuccess',
			payload: data?.users,
		});
	} catch (error) {
		dispatch({
			type: 'getAllUsersDataFail',
			payload: error.response.data.message,
		});
	}
};

// UPDATE USER
export const updateUser = (id, formData) => async dispatch => {
	try {
		dispatch({
			type: 'updateUserRequest',
		});
		const { data } = await axios.put(
			`${server}/user/user-update/${id}`,
			formData
		);
		dispatch({
			type: 'updateUserSuccess',
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: 'updateUserFail',
			payload: error.response.data.message,
		});
	}
};

// CHANGE USER STATUS
export const changeUserStatus = id => async dispatch => {
	try {
		dispatch({
			type: 'changeUserStatusRequest',
		});
		const { data } = await axios.put(`${server}/user/${id}/change-status`);
		dispatch({
			type: 'changeUserStatusSuccess',
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: 'changeUserStatusFail',
			payload: error.response.data.message,
		});
	}
};

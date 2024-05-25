import { createReducer } from '@reduxjs/toolkit';

export const userReducer = createReducer({ token: null }, builder => {
	// login cases
	builder.addCase('loginRequest', (state, action) => {
		state.loading = true;
	});
	builder.addCase('loginSuccess', (state, action) => {
		state.loading = false;
		state.message = action.payload.message;
		state.isAuth = true;
		state.token = action.payload.token;
	});
	builder.addCase('loginFail', (state, action) => {
		state.isAuth = false;
		state.error = action.payload;
	});
	// error message cases
	builder.addCase('clearError', state => {
		state.error = null;
	});
	builder.addCase('clearMessage', state => {
		state.message = null;
	});

	//REGISTER
	builder.addCase('registerRequest', (state, action) => {
		state.loading = true;
	});
	builder.addCase('registerSuccess', (state, action) => {
		state.loading = false;
		state.isAuth = true;
		state.message = action.payload;
	});
	builder.addCase('registerFail', (state, action) => {
		state.isAuth = false;
		state.error = action.payload;
	});

	// get user data
	builder.addCase('getUserDataRequest', (state, action) => {
		state.loading = true;
	});
	builder.addCase('getUserDataSuccess', (state, action) => {
		state.loading = false;
		state.isAuth = true;
		state.user = action.payload;
	});
	builder.addCase('getUserDataFail', (state, action) => {
		state.isAuth = false;
		state.error = action.payload;
	});

	// logout
	builder.addCase('logoutRequest', (state, action) => {
		state.loading = true;
	});
	builder.addCase('logoutSuccess', (state, action) => {
		state.loading = false;
		state.isAuth = false;
		state.user = null;
		state.message = action.payload;
	});
	builder.addCase('logoutFail', (state, action) => {
		state.isAuth = false;
		state.error = action.payload;
	});

	// Update profile
	builder.addCase('updateProfileRequest', (state, action) => {
		state.loading = true;
	});
	builder.addCase('updateProfileSuccess', (state, action) => {
		state.loading = false;
		state.message = action.payload;
	});
	builder.addCase('updateProfileFail', (state, action) => {
		state.error = action.payload;
	});

	// Update profile pic
	builder.addCase('updateProfilePicRequest', (state, action) => {
		state.loading = true;
	});
	builder.addCase('updateProfilePicSuccess', (state, action) => {
		state.loading = false;
		state.message = action.payload;
	});
	builder.addCase('updateProfilePicFail', (state, action) => {
		state.error = action.payload;
	});

	// get users data
	builder.addCase('getAllUsersDataRequest', (state, action) => {
		state.loading = true;
	});
	builder.addCase('getAllUsersDataSuccess', (state, action) => {
		state.users = action.payload;
		state.loading = false;
	});
	builder.addCase('getAllUsersDataFail', (state, action) => {
		state.error = action.payload;
	});
});

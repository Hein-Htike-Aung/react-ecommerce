import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		currentUser: null,
		fetching: false,
		error: false,
	},
	reducers: {
		loginStart: (state) => {
			state.fetching = true;
		},
		loginSuccess: (state, action) => {
			state.fetching = false;
			state.currentUser = action.payload;
		},
		loginFailure: (state) => {
			state.fetching = false;
			state.error = true;
		},
		logout: (state) => {
			state.currentUser = {};
		},
	},
});

export const { loginStart, loginSuccess, loginFailure } = userSlice.actions;
export default userSlice.reducer;

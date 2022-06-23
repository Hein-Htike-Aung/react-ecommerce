import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
	name: 'product',
	initialState: {
		products: null,
		isFetching: false,
		error: false,
	},
	reducers: {
		/* Get all */
		getProductStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		getProductSuccess: (state, action) => {
			state.isFetching = false;
			state.error = false;
			state.products = action.payload;
		},
		getProductFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
		/* Delete product */
		deleteProductStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		deleteProductSuccess: (state, action) => {
			state.isFetching = false;
			state.error = false;
			state.products.splice(
				state.products.findIndex((item) => item._id === action.payload),
				1,
			);
		},
		deleteProductFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
		/* Update product */
		updateProductStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		updateProductSuccess: (state, action) => {
			state.isFetching = false;
			state.error = false;
			// state.products[
			// 	state.products.findIndex((item) => item._id === action.payload)
			// ] = action.payload.product;
			state.products.map(
				(p) => p._id === action.payload.id && action.payload.product,
			);
		},
		updateProductFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
		/* Add product */
		addProductStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		addProductSuccess: (state, action) => {
			state.isFetching = false;
			state.error = false;
			state.products.push(action.payload);
		},
		addProductFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
	},
});

export const {
	getProductStart,
	getProductSuccess,
	getProductFailure,
	deleteProductStart,
	deleteProductSuccess,
	deleteProductFailure,
	updateProductStart,
	updateProductSuccess,
	updateProductFailure,
	addProductStart,
	addProductSuccess,
	addProductFailure,
} = userSlice.actions;
export default userSlice.reducer;

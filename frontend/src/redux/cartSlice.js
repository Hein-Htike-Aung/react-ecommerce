import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		products: [],
		cartQuantity: 0,
		totalPrice: 0,
	},
	reducers: {
		addProduct: (state, action) => {
			state.cartQuantity += 1;
			state.products.push(action.payload);
			state.totalPrice += action.payload.price * action.payload.quantity;
		},
	},
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;

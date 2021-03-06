import { publicRequest, userRequest } from '../requestMethods';
import {
	deleteProductFailure,
	deleteProductStart,
	deleteProductSuccess,
	updateProductFailure,
	updateProductStart,
	updateProductSuccess,
	addProductFailure,
	addProductStart,
	addProductSuccess,
	getProductFailure,
	getProductStart,
	getProductSuccess,
} from './productSlice';
import { loginFailure, loginStart, loginSuccess } from './userSlice';

export const login = async (dispatch, user) => {
	dispatch(loginStart());

	try {
		const res = await publicRequest.post('/auth/login', user);

		dispatch(loginSuccess(res.data));
	} catch (error) {
		dispatch(loginFailure());
	}
};

export const getProducts = async (dispatch) => {
	dispatch(getProductStart());

	try {
		const res = await userRequest.get('/product/by-query/list');

		dispatch(getProductSuccess(res.data));
	} catch (error) {
		dispatch(getProductFailure());
	}
};

export const deleteProduct = async (dispatch, id) => {
	dispatch(deleteProductStart());

	try {
		await userRequest.delete(`/product/${id}`);

		dispatch(deleteProductSuccess(id));
	} catch (error) {
		dispatch(deleteProductFailure());
	}
};

export const updateProduct = async (dispatch, id, product) => {
	dispatch(updateProductStart());

	try {
		const res = await userRequest.patch(`/product/${id}`, product);

		dispatch(updateProductSuccess({ id, product: res.data }));
	} catch (error) {
		dispatch(updateProductFailure());
	}
};
export const addProduct = async (dispatch, product) => {
	dispatch(addProductStart());

	try {

		const res = await userRequest.post(`/product`, product);

		dispatch(addProductSuccess(res.data));
	} catch (error) {
		dispatch(addProductFailure());
	}
};

import { DocumentDefinition, UpdateQuery, QueryOptions } from 'mongoose';
import Cart, { CartDocument } from '../models/cart.model';

export const createCart = (input: DocumentDefinition<CartDocument>) => {
	try {
		return Cart.create(input);
	} catch (error) {
		throw new Error(error as any);
	}
};

export const updateCart = (
	id: string,
	update: UpdateQuery<CartDocument>,
	options: QueryOptions,
) => {
	try {
		return Cart.findByIdAndUpdate(id, { $set: update }, options);
	} catch (error) {
		throw new Error(error as any);
	}
};

export const deleteCart = (id: string) => {
	try {
		return Cart.findByIdAndDelete(id);
	} catch (error) {
		throw new Error(error as any);
	}
};

export const findCartByUserId = (userId: string) => {
	return Cart.findOne({ userId });
};

export const findAllCarts = () => {
	return Cart.find();
};

import { DocumentDefinition, QueryOptions, UpdateQuery } from 'mongoose';
import Product, { ProductDocument } from '../models/product.model';

export const createProduct = async (
	input: DocumentDefinition<ProductDocument>,
) => {
	try {
		return await Product.create(input);
	} catch (error) {
		throw new Error(error as any);
	}
};

export const updateProuct = async (
	id: string,
	update: UpdateQuery<ProductDocument>,
	options: QueryOptions,
) => {
	try {
		return Product.findByIdAndUpdate(id, { $set: update }, options);
	} catch (error) {
		throw new Error(error as any);
	}
};

export const deleteProduct = async (id: string) => {
	try {
		return Product.findByIdAndDelete(id);
	} catch (error) {
		throw new Error(error as any);
	}
};

export const findProductById = async (id: string) => {
	return await Product.findById(id);
};

export const findProducts = async (count = 0) => {
	if (count) {
		return await Product.find().sort({ createdAt: -1 }).limit(count);
	}
	return await Product.find();
};

export const findProductByCategoryName = async (category: string) => {
	return await Product.find({
		categories: {
			$in: [category],
		},
	});
};

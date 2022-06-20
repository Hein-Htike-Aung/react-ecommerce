import { array, number, object, string, boolean } from 'yup';

export const createProductSchema = object({
	body: object({
		title: string().required('Product title is required'),
		desc: string().required('Product Desc is required'),
		img: string().required('Product Img is rquired'),
		categories: array().min(1),
		size: array().min(1),
		color: array().min(1),
		inStock: boolean(),
		price: number().required("Product's price is required"),
	}),
});

const params = {
	params: object({
		productId: string().required('ProductId is required'),
	}),
};

export const productIdSchema = object({ ...params });

export const updateProductSchema = object({
	...params,
	body: object({
		title: string(),
		desc: string(),
		img: string(),
		categories: array(),
		size: array(),
		color: array(),
		inStock: boolean(),
		price: number(),
	}),
});

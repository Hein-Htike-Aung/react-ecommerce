import { array, number, object, string } from 'yup';

export const createProductSchema = object({
	body: object({
		title: string().required('Product title is required'),
		desc: string().required('Product Desc is required'),
		img: string().required('Product Img is rquired'),
		categories: array(),
		size: string(),
		color: string(),
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
		size: string(),
		color: string(),
		price: number(),
	}),
});

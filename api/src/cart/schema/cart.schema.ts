import { array, number, object, string } from 'yup';

export const createCartSchema = object({
	body: object({
		userId: string().required('UserId is required'),
		products: array()
			.of(
				object().shape({
					productId: string().max(255).required().label('productId'),
					quantity: number().min(1).required().label('quantity'),
				}),
			)
			.min(1),
	}),
});

const params = {
	params: object({
		cartId: string().required('cartId is required'),
	}),
};

export const cartIdSchema = object({ ...params });

export const updateCartSchema = object({
	...params,
	body: object({
		userId: string(),
		products: array().of(
			object().shape({
				productId: string(),
				quantity: number(),
			}),
		),
	}),
});

import { array, number, object, string } from 'yup';

export const createOrderSchema = object({
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
		amount: number().required('Amount is required'),
		address: string().required('address is required'),
		status: string(),
	}),
});

const params = {
	params: object({
		cartId: string().required('cartId is required'),
	}),
};

export const orderIdSchema = object({ ...params });

export const updateOrderSchema = object({
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
	amount: number(),
	address: string(),
	status: string(),
});

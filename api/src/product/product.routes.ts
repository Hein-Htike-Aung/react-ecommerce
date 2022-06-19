import { Express } from 'express';
import { isAdmin } from '../middleware/isAdmin';
import validateRequest from '../middleware/validateRequest';
import {
	createProductHandler,
	deleteProductHandler,
	findProductHandler,
	findProductsHandler,
	updateProductHandler,
} from './controllers/product.controller';
import {
	createProductSchema,
	productIdSchema,
	updateProductSchema,
} from './schema/product.schema';

const PRODUCT_URL = `/api/product`;

export const productRoute = (app: Express) => {
	/* Create Product */
	app.post(
		`${PRODUCT_URL}`,
		[isAdmin, validateRequest(createProductSchema)],
		createProductHandler,
	);

	/* Update Product */
	app.patch(
		`${PRODUCT_URL}/:productId`,
		[isAdmin, validateRequest(updateProductSchema)],
		updateProductHandler,
	);

	/* Delete Product */
	app.delete(
		`${PRODUCT_URL}/:proudctId`,
		[isAdmin, validateRequest(productIdSchema)],
		deleteProductHandler,
	);

	/* Find Product */
	app.get(
		`${PRODUCT_URL}/:productId`,
		validateRequest(productIdSchema),
		findProductHandler,
	);

	/* Find Products by-query */
	app.get(`${PRODUCT_URL}/by-query/list`, findProductsHandler);
};

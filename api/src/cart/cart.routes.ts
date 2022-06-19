import { Express } from 'express';
import { isAdmin } from '../middleware/isAdmin';
import validateRequest from '../middleware/validateRequest';
import { verifyToken } from './../middleware/verify-token';
import { verifyCartOwnerAndAuthorization } from './../middleware/verifyCartOwner';
import { userIdSchema } from './../user/schema/user.schema';
import {
	createCartHandler,
	deleteCartHandler, findCartsHandler, findUserCartHandler,
	updateCartHandler
} from './controllers/cart.controller';
import {
	cartIdSchema, createCartSchema,
	updateCartSchema
} from './schema/cart.schema';

const CART_URL = `/api/cart`;

export const cartRoute = (app: Express) => {
	/* Create Cart */
	app.post(
		`${CART_URL}`,
		[verifyToken, validateRequest(createCartSchema)],
		createCartHandler,
	);

	/* Updaet Cart */
	app.patch(`${CART_URL}/:cartId`, [
		verifyCartOwnerAndAuthorization,
		validateRequest(updateCartSchema),
		updateCartHandler,
	]);

	/* Delete Cart */
	app.delete(
		`${CART_URL}/:cartId`,
		[verifyCartOwnerAndAuthorization, validateRequest(cartIdSchema)],
		deleteCartHandler,
	);

	/* Find User's Cart */
	app.get(
		`${CART_URL}/user-cart/:userId`,
		[verifyCartOwnerAndAuthorization, validateRequest(userIdSchema)],
		findUserCartHandler,
	);

	/* Find All carts */
	app.get(`${CART_URL}`, [isAdmin], findCartsHandler);
};

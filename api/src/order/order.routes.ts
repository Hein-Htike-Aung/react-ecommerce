import { Express } from 'express';
import { isAdmin } from '../middleware/isAdmin';
import validateRequest from '../middleware/validateRequest';
import { verifyToken } from './../middleware/verify-token';
import { verifyCartOwnerAndAuthorization } from './../middleware/verifyCartOwner';
import { userIdSchema } from './../user/schema/user.schema';
import {
    createOrderHandler,
    deleteOrderHandler, findMonthlyIncomesHandler, findOrdersHandler,
    findUserOrderHandler, updateOrderHandler
} from './controllers/order.controller';
import {
    createOrderSchema,
    orderIdSchema,
    updateOrderSchema
} from './schema/order.schema';

const ORDER_URL = `/api/order`;

export const orderRoute = (app: Express) => {
	/* Create Order */
	app.post(
		`${ORDER_URL}`,
		[verifyToken, validateRequest(createOrderSchema)],
		createOrderHandler,
	);

	/* Update Order */
	app.patch(`${ORDER_URL}/:orderId`, [
		verifyCartOwnerAndAuthorization,
		validateRequest(updateOrderSchema),
		updateOrderHandler,
	]);

	/* Delete Order */
	app.delete(
		`${ORDER_URL}/:orderId`,
		[verifyCartOwnerAndAuthorization, validateRequest(orderIdSchema)],
		deleteOrderHandler,
	);

	/* Find User's Order */
	app.get(
		`${ORDER_URL}/user-order/:userId`,
		[verifyCartOwnerAndAuthorization, validateRequest(userIdSchema)],
		findUserOrderHandler,
	);

	/* Find All orders */
	app.get(`${ORDER_URL}`, [isAdmin], findOrdersHandler);

	/* Find Monthly Incomes (can use monthly/income by specific product id) 
		/monthly/income?productId=
	*/
	app.get(`${ORDER_URL}/monthly/income`, [isAdmin], findMonthlyIncomesHandler);
};

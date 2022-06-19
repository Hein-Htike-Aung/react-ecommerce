import { Express } from 'express';
import { isAdmin } from '../middleware/isAdmin';
import validateRequest from '../middleware/validateRequest';
import { verifyTokenAndAuthorization } from './../middleware/verify-token-authorization';
import {
	deleteUserHandler, findUserByIdHandler,
	findUsersHandler,
	findUsersStatHandler, loginHandler,
	registerUserHandler,
	updateUserHandler
} from './controllers/user.controller';
import {
	credentialInfoSchema,
	registerUserSchema,
	updateUserSchema,
	userIdSchema
} from './schema/user.schema';

const AUTH_URL = '/api/auth';
const USER_URL = '/api/user';

export const authRoute = (app: Express) => {
	/* Register */
	app.post(
		`${AUTH_URL}/register`,
		validateRequest(registerUserSchema),
		registerUserHandler,
	);

	/* Loin */
	app.post(
		`${AUTH_URL}/login`,
		validateRequest(credentialInfoSchema),
		loginHandler,
	);
};

export const userRoute = (app: Express) => {
	/* Update User */
	app.patch(
		`${USER_URL}/:userId`,
		[verifyTokenAndAuthorization, validateRequest(updateUserSchema)],
		updateUserHandler,
	);

	/* Delete User */
	app.delete(
		`${USER_URL}/:userId`,
		[verifyTokenAndAuthorization, validateRequest(userIdSchema)],
		deleteUserHandler,
	);

	/* Find user by id */
	app.get(
		`${USER_URL}/:userId`,
		[isAdmin, validateRequest(userIdSchema)],
		findUserByIdHandler,
	);

	/* Find All User or by-query (find latest ?new=5) */
	app.get(`${USER_URL}`, isAdmin, findUsersHandler);

	/* Find Users Stat  (find total registered users count for each month) */
	app.get(`${USER_URL}/by-month/stats`, isAdmin, findUsersStatHandler);
};

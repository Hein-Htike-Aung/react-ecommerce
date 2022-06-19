import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';
import { verifyToken } from './verify-token';


export const verifyTokenAndAuthorization = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	verifyToken(req, res, () => {
		const paramUserId = get(req, 'params.userId');
		const user = get(req, 'user');

		if (paramUserId != user.id && !user.isAdmin)
			return res
				.status(403)
				.send({ error: 'Forbidden Action' });

		next();
	});
};

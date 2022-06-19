import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';
import { verifyToken } from './verify-token';

export const verifyCartOwnerAndAuthorization = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	verifyToken(req, res, () => {
		const { userId } = req.body;

		const user = get(req, 'user');

		if (userId != user.id && !user.isAdmin)
			return res.status(403).send({ error: 'Forbidden Action' });

		next();
	});
};

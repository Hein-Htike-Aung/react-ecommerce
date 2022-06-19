import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { get } from 'lodash';
import { verifyToken } from './verify-token';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
	verifyToken(req, res, () => {
		const user = get(req, 'user');

		if (!user.isAdmin)
			return res.status(403).send({ error: 'You are not allowed to do that' });

		next();
	});
};

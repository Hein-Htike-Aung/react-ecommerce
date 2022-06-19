import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { get } from 'lodash';

export const verifyToken = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const access_token = get(req, 'headers.authorization', '').replace(
		/^Bearer\s/,
		'',
	);

	if (!access_token) return res.status(401).json('You are not authenticated!');

	jwt.verify(access_token, process.env.JWT_SEC, (err: any, user: any) => {
		if (err) res.status(403).json({ error: 'Token is not valid!' });

		// @ts-ignore
		req.user = user;

		next();
	});
};

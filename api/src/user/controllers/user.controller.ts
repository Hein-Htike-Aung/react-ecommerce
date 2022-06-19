import {
	findAllUsers,
	findLastestUser,
	findUsersStat,
} from './../services/user.service';
import { Request, Response } from 'express';
import { get, omit } from 'lodash';
import log from '../../log';
import {
	deleteUserById,
	findUserById,
	registerUser,
	updateUser,
	validateUser,
} from '../services/user.service';
import CryptoJS from 'crypto-js';

export const registerUserHandler = async (req: Request, res: Response) => {
	try {
		const user = await registerUser(req.body);

		return res.send(omit(user.toJSON(), 'password'));
	} catch (e: any) {
		log.error(e);
		return res.status(409).send({ error: e.message });
	}
};

export const loginHandler = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	try {
		const validUser = await validateUser(username, password);

		if (!validUser) {
			return res.status(401).send({ error: 'Invnalid Credentails' });
		}

		return res.send({
			user: validUser.user,
			access_token: validUser.access_token,
		});
	} catch (e: any) {
		return res.status(500).send({ error: e.message });
	}
};

export const updateUserHandler = async (req: Request, res: Response) => {
	const paramUserId = get(req, 'params.userId');
	const update = req.body;

	if (update.password) {
		update.password = CryptoJS.AES.encrypt(
			update.password,
			process.env.PASS_SEC,
		).toString();
	}

	try {
		const updatedUser = await updateUser(paramUserId, update, { new: true });

		return res.send(omit(updatedUser.toJSON(), 'password'));
	} catch (e: any) {
		return res.status(500).send({ error: e.message });
	}
};

export const deleteUserHandler = async (req: Request, res: Response) => {
	try {
		const paramUserId = get(req, 'params.userId');

		await deleteUserById(paramUserId);

		return res.send({ message: 'Successfully deleted' });
	} catch (e: any) {
		return res.status(500).send({ error: e.message });
	}
};

export const findUserByIdHandler = async (req: Request, res: Response) => {
	const paramUserId = get(req, 'params.userId');

	const user = await findUserById(paramUserId);

	return res.send(omit(user.toJSON(), 'password'));
};

export const findUsersHandler = async (req: Request, res: Response) => {
	const limit = get(req, 'query.new');

	const users = limit ? await findLastestUser(limit) : await findAllUsers();

	return res.send(users);
};

export const findUsersStatHandler = async (req: Request, res: Response) => {
	const date = new Date();
	const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

	const usersStat = await findUsersStat(lastYear);

	return res.send(usersStat);
};

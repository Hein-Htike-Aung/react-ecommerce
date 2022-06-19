import {
	deleteCart,
	findCartByUserId,
	updateCart,
	findAllCarts,
} from './../services/cart.service';
import { Request, Response } from 'express';
import { get, omit } from 'lodash';
import { createCart } from '../services/cart.service';
import log from '../../log';

export const createCartHandler = async (req: Request, res: Response) => {
	try {
		const product = await createCart(req.body);

		return res.send(product);
	} catch (e: any) {
		log.error(e);
		return res.status(409).send({ error: e.message });
	}
};

export const updateCartHandler = async (req: Request, res: Response) => {
	const paramCartId = get(req, 'params.cartId');
	const update = req.body;

	try {
		const product = await updateCart(paramCartId, update, { new: true });

		return res.send(product);
	} catch (e: any) {
		log.error(e);
		return res.status(409).send({ error: e.message });
	}
};

export const deleteCartHandler = async (req: Request, res: Response) => {
	const paramCartId = get(req, 'params.cartId');

	try {
		await deleteCart(paramCartId);

		return res.send({ message: 'Successfully deleted' });
	} catch (e: any) {
		log.error(e);
		return res.status(409).send({ error: e.message });
	}
};

export const findUserCartHandler = async (req: Request, res: Response) => {
	const paramUserId = get(req, 'params.userId');

	return res.send(await findCartByUserId(paramUserId));
};

export const findCartsHandler = async (req: Request, res: Response) => {
	return res.send(await findAllCarts());
};
import { Request, Response } from 'express';
import { get, omit } from 'lodash';
import log from '../../log';
import {
	findAllOrders,
	createOrder,
	deleteOrder,
	findOrderByUserId,
	findMonthlyIncomes,
	updateOrder,
} from '../services/order.service';

export const createOrderHandler = async (req: Request, res: Response) => {
	try {
		const product = await createOrder(req.body);

		return res.send(product);
	} catch (e: any) {
		log.error(e);
		return res.status(409).send({ error: e.message });
	}
};

export const updateOrderHandler = async (req: Request, res: Response) => {
	const paramOrderId = get(req, 'params.orderId');
	const update = req.body;

	try {
		const product = await updateOrder(paramOrderId, update, { new: true });

		return res.send(product);
	} catch (e: any) {
		log.error(e);
		return res.status(409).send({ error: e.message });
	}
};

export const deleteOrderHandler = async (req: Request, res: Response) => {
	const paramOrderId = get(req, 'params.OrderId');

	try {
		await deleteOrder(paramOrderId);

		return res.send({ message: 'Successfully deleted' });
	} catch (e: any) {
		log.error(e);
		return res.status(409).send({ error: e.message });
	}
};

export const findUserOrderHandler = async (req: Request, res: Response) => {
	const paramUserId = get(req, 'params.userId');

	return res.send(await findOrderByUserId(paramUserId));
};

export const findOrdersHandler = async (req: Request, res: Response) => {
	return res.send(await findAllOrders());
};

export const findMonthlyIncomesHandler = async (
	req: Request,
	res: Response,
) => {
	const productId = get(req, 'query.productId');

	const date = new Date();
	const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
	const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

	return res.send(await findMonthlyIncomes(previousMonth, productId));
};

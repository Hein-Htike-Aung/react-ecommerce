import { ProductDocument } from './../models/product.model';
import {
	findProductById,
	findProducts,
	findProductByCategoryName,
} from './../services/product.service';
import { Request, Response } from 'express';
import { get, omit } from 'lodash';
import log from '../../log';
import {
	createProduct,
	deleteProduct,
	updateProuct,
} from '../services/product.service';

export const createProductHandler = async (req: Request, res: Response) => {
	try {
		const product = await createProduct(req.body);

		return res.send(product);
	} catch (e: any) {
		log.error(e);
		return res.status(409).send({ error: e.message });
	}
};

export const updateProductHandler = async (req: Request, res: Response) => {
	const paramProudctId = get(req, 'params.productId');
	const update = req.body;

	try {
		const product = await updateProuct(paramProudctId, update, { new: true });

		return res.send(product);
	} catch (e: any) {
		log.error(e);
		return res.status(409).send({ error: e.message });
	}
};

export const deleteProductHandler = async (req: Request, res: Response) => {
	const paramProudctId = get(req, 'params.productId');

	try {
		await deleteProduct(paramProudctId);

		return res.send({ message: 'Successfully deleted' });
	} catch (e: any) {
		log.error(e);
		return res.status(409).send({ error: e.message });
	}
};

export const findProductHandler = async (req: Request, res: Response) => {
	const paramProudctId = get(req, 'params.productId');

	return res.send(await findProductById(paramProudctId));
};

export const findProductsHandler = async (req: Request, res: Response) => {
	const limit = get(req, 'query.limit');
	const category = get(req, 'query.category');

	let products: ProductDocument[] = [];

	if (category) {
		products = products.concat(await findProductByCategoryName(category));
	} else if (limit) {
		products = products.concat(await findProducts(limit));
	} else {
		products = products.concat(await findProducts());
	}

	return res.send(products);
};

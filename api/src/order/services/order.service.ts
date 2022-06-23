import Order, { OrderDocument } from './../model/order.model';
import {
	DocumentDefinition,
	UpdateQuery,
	QueryOptions,
	Expression,
} from 'mongoose';
import Product from '../../product/models/product.model';

export const createOrder = (input: DocumentDefinition<OrderDocument>) => {
	try {
		return Order.create(input);
	} catch (error) {
		throw new Error(error as any);
	}
};

export const updateOrder = (
	id: string,
	update: UpdateQuery<OrderDocument>,
	options: QueryOptions,
) => {
	try {
		return Order.findByIdAndUpdate(id, { $set: update }, options);
	} catch (error) {
		throw new Error(error as any);
	}
};

export const deleteOrder = (id: string) => {
	try {
		return Order.findByIdAndDelete(id);
	} catch (error) {
		throw new Error(error as any);
	}
};

export const findOrderByUserId = (userId: string) => {
	return Order.findOne({ userId });
};

export const findAllOrders = () => {
	return Order.find();
};

export const findMonthlyIncomes = async (month: Date, productId?: string) => {
	const query: Record<string, Expression> = {
		products: { $elemMatch: { productId } },
	} as unknown as Record<string, Expression>;

	// Find Monthy Incomes by product Id
	const andQuery = {
		$and: [{ createdAt: { $gte: month } }, query],
	};

	const monthQuery = {
		createdAt: { $gte: month },
	};

	return Order.aggregate([
		{
			$match: productId ? andQuery : monthQuery,
		},
		{
			$project: {
				month: { $month: '$createdAt' },
				sales: '$amount',
			},
		},
		{
			$group: {
				_id: '$month',
				total: { $sum: '$sales' },
			},
		},
	]);
};

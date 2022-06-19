import mongoose from 'mongoose';

export interface OrderDocument extends mongoose.Document {
	userId: string;
	products: { productId: string; quantity: number }[];
	amount: number;
	address: {};
	status: 'pending';
}

const OrderSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		products: [
			{
				productId: {
					type: String,
					required: true,
				},
				quantity: {
					type: Number,
					default: 1,
				},
			},
		],
		amount: {
			type: Number,
			required: true,
		},
		address: {
			type: Object,
			required: true,
		},
		status: {
			type: String,
			default: 'pending',
		},
	},
	{ timestamps: true },
);

const Order = mongoose.model<OrderDocument>('Order', OrderSchema);
export default Order;

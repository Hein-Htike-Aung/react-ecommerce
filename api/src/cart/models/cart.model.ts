import mongoose from 'mongoose';

export interface CartDocument extends mongoose.Document {
	userId: string;
	products: { productId: string; quantity: number }[];
}

const CartSchema = new mongoose.Schema(
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
	},
	{ timestamps: true },
);

const Cart = mongoose.model<CartDocument>('Cart', CartSchema);
export default Cart;

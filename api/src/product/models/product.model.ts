import mongoose from 'mongoose';

export interface ProductDocument extends mongoose.Document {
	title: string;
	desc: string;
	img: string;
	categories: string[];
	size: string[];
	color: string[];
	price: number;
	inStock: true;
}

const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true,
		},
		desc: {
			type: String,
			required: true,
		},
		img: {
			type: String,
			required: true,
		},
		categories: {
			type: Array, // ["T-shirt", "jeans"]
		},
		size: {
			type: Array, // ['XS', 'S', 'M', 'L', 'XL']
		},
		color: {
			type: Array, // ["white", "black", "yellow"]
		},
		price: {
			type: Number,
			required: true,
		},
		inStock: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true },
);

const Product = mongoose.model<ProductDocument>('Product', productSchema);
export default Product;

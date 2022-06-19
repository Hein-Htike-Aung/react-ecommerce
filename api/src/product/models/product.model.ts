import mongoose from 'mongoose';

export interface ProductDocument extends mongoose.Document {
	title: string;
	desc: string;
	img: string;
	categories: string[];
	size: string;
	color: string;
	pirce: number;
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
			type: Array,  // ["", ""]
		},
		size: {
			type: String,
		},
		color: {
			type: String,
		},
		price: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true },
);

const Product = mongoose.model<ProductDocument>('Product', productSchema);
export default Product;

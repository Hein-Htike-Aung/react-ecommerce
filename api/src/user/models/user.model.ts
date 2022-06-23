import CryptoJS from 'crypto-js';
import 'dotenv/config';
import mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
	username: string;
	email: string;
	password: string;
	isAdmin: false;
	comparePassword: (inputPassword: string) => boolean;
}

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		img: {
			type: String
		}
	},
	{ timestamps: true },
);

/* Schema Pre (must not be arrwow function) */
UserSchema.pre(
	'save',
	async function (next: mongoose.CallbackWithoutResultAndOptionalError) {
		let user = this as UserDocument;

		const hash = CryptoJS.AES.encrypt(
			user.password,
			process.env.PASS_SEC,
		).toString();

		user.password = hash;

		return next();
	},
);

/* Schema methods (must not be arrwow function) */
UserSchema.methods.comparePassword = function (inputPassword: string) {
	const user = this as UserDocument;

	const hashedPassword = CryptoJS.AES.decrypt(
		user.password,
		process.env.PASS_SEC,
	);

	const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

	return inputPassword === originalPassword;
};

const User = mongoose.model<UserDocument>('User', UserSchema);
export default User;

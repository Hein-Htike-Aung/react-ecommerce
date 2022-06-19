import { DocumentDefinition, QueryOptions, UpdateQuery } from 'mongoose';
import User, { UserDocument } from '../models/user.model';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { omit, get } from 'lodash';

export const registerUser = async (input: DocumentDefinition<UserDocument>) => {
	try {
		return await User.create(input);
	} catch (error) {
		throw new Error(error as any);
	}
};

export const validateUser = async (username: string, password: string) => {
	const user = await User.findOne({ username });

	if (!user) return false;

	const isValid = user.comparePassword(password);

	if (!isValid) return false;

	return {
		access_token: jwt.sign(
			{
				id: user._id,
				isAdmin: user.isAdmin,
			},
			process.env.JWT_SEC,
			{ expiresIn: process.env.ACCESS_TOKEN_TTL },
		),
		user: omit(user, 'password'),
	};
};

export const updateUser = (
	id: string,
	update: UpdateQuery<UserDocument>,
	options: QueryOptions,
) => {
	try {
		return User.findByIdAndUpdate(id, { $set: update }, options);
	} catch (error) {
		throw new Error(error as any);
	}
};

export const deleteUserById = async (id: string) => {
	try {
		await User.findByIdAndDelete(id);
	} catch (error) {
		throw new Error(error as any);
	}
};

export const findUserById = async (id: string) => {
	return await User.findById(id);
};

export const findAllUsers = async () => {
	return await User.find().select(['-password']);
};

export const findLastestUser = async (count: number) => {
	return await User.find().select(['-password']).sort({ _id: -1 }).limit(count);
};

export const findUsersStat = async (lastYear: Date) => {
	return await User.aggregate([
		{ $match: { createdAt: { $gte: lastYear } } }, // Condition
		{
			$project: {
				month: { $month: '$createdAt' },
			},
		},
		{
			$group: {
				_id: '$month',
				total: { $sum: 1 }, // sum every registered user by each months
			},
		},
	]);
};

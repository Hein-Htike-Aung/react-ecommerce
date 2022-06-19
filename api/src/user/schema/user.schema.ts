import { object, string, array, ref, boolean, mixed } from 'yup';


const params = {
	params: object({
		userId: string().required('UserId is required'),
	}),
};

export const registerUserSchema = object({
	body: object({
		username: string().required('Name is required'),
		email: string()
			.email('Must be a valid email')
			.required('Email is required'),
		password: string()
			.required('Password is required')
			.min(6, 'Password is too short - should be 6 chars minimum.')
			.matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin letters.'),
		isAdmin: boolean(),
	}),
});

export const credentialInfoSchema = object({
	body: object({
		username: string().required('Name is required'),
		password: string()
			.required('Password is required')
			.min(6, 'Password is too short - should be 6 chars minimum.')
			.matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin letters.'),
	}),
});

export const updateUserSchema = object({
	...params,
	body: object({
		username: string(),
		email: string().email('Must be a valid email'),
		password: string()
			.min(6, 'Password is too short - should be 6 chars minimum.')
			.matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin letters.'),
		isAdmin: boolean(),
	}),
});

export const userIdSchema = object({ ...params });

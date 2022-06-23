import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/apiCalls';
import './login.css';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();

	const handleLogin = (e) => {
		e.preventDefault();

		login(dispatch, { username, password });
	};

	return (
		<div className='login'>
			<input
				className='loginInput'
				type='text'
				placeholder='username'
				onChange={(e) => setUsername(e.target.value)}
			/>
			<input
				className='loginInput'
				type='password'
				placeholder='password'
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button className='loginButton' onClick={handleLogin}>
				Login
			</button>
		</div>
	);
};

export default Login;

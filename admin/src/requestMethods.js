import axios from 'axios';

const BASE_URL = 'http://localhost:8800/api/';

let token = '';

try {
	token = JSON.parse(JSON.parse(localStorage.getItem('persist:root'))?.user)
		?.currentUser?.access_token;
} catch (error) {
	token = '';
}

export const publicRequest = axios.create({
	baseURL: BASE_URL,
});

export const userRequest = axios.create({
	baseURL: BASE_URL,
	headers: { 'Authorization': `Bearer ${token}` },
});

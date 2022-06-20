import axios from 'axios';

const BASE_URL = 'http://localhost:8800/api/';
const TOKEN =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYWU5Zjk1NzljYzNiZGY2MzEzMmY4MCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NTczNzM1NywiZXhwIjoxNjU1OTk2NTU3fQ.VPp61ImPeE7ewWnNQmY3eBrK6DKvE4VVegv6_nNPuEU';

export const publicRequest = axios.create({
	baseURL: BASE_URL,
});

export const userRequest = axios.create({
	baseURL: BASE_URL,
	headers: { token: `Bearer ${TOKEN}` },
});

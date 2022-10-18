import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';

const handler: Handler = async function (event, _context) {
	const body = event.body ? JSON.parse(event.body) : null;
	const { token } = body;

	if (!token) return { statusCode: 400, body: 'Missing token' };

	if (!process.env.HCAPTCHA_API_URL || !process.env.HCAPTCHA_SECRET_KEY) {
		return { statusCode: 500, body: 'Missing hCaptcha API URL or secret' };
	}

	const response = await fetch(process.env.HCAPTCHA_API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			secret: process.env.HCAPTCHA_SECRET_KEY,
			response: token,
		}),
	});

	if (!response.ok) return { statusCode: 500, body: 'hCaptcha API error' };
	const data = (await response.json()) as any;

	return {
		statusCode: 200,
		body: JSON.stringify({
			success: data.success as boolean,
		}),
	};
};

export { handler };

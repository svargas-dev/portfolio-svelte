import { Handler } from '@netlify/functions';
import nodemailer from 'nodemailer';

const handler: Handler = async function (event, _context) {
	async function main(): Promise<number> {
		if (
			typeof event.headers['authorization'] === 'undefined' ||
			event.headers['authorization'] !== process.env.PUBLIC_KEY
		) {
			return 401;
		}

		if (event.httpMethod !== 'POST' || !event.body) {
			return 400;
		}

		const { name, email, message } = JSON.parse(event.body);
		if (!name || !email || !message) {
			return 400;
		}

		// create reusable transporter object using the default SMTP transport
		const transporter = nodemailer.createTransport({
			host: 'mail.gmx.com',
			port: 587,
			secure: false,
			auth: {
				user: process.env.NODEMAILER_USER,
				pass: process.env.NODEMAILER_PASS,
			},
			tls: { rejectUnauthorized: true },
		});

		// send mail with defined transport object
		await transporter.sendMail({
			from: process.env.NODEMAILER_USER,
			to: process.env.NODEMAILER_USER,
			replyTo: `${name} <${email}>`,
			subject: 'WEB CONTACT ✔',
			text: message,
		});

		return 200;
	}

	try {
		const code = await main();
		if (code === 200) {
			return {
				statusCode: 200,
			};
		}
		return {
			statusCode: code,
		};
	} catch (e) {
		return {
			statusCode: 500,
			body: JSON.stringify(e),
		};
	}
};

export { handler };

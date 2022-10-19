import { functionsBaseUrl } from '$lib/utils/functionsBaseUrl';

type VerifyHCapture = {
	success: boolean;
	error: boolean;
};

export async function verifyHCaptcha(hcaptchaWidgetID: string): Promise<VerifyHCapture> {
	try {
		const res = await hcaptcha?.execute(hcaptchaWidgetID, {
			async: true,
		});

		if (res) {
			const { response: hCaptchaResponse } = res;

			// Verify the token with a serverless function
			const verifyResponse = await fetch(`${functionsBaseUrl}/verify`, {
				method: 'POST',
				credentials: 'omit',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					token: hCaptchaResponse,
				}),
			});
			const data = await verifyResponse.json();
			return {
				success: data.success,
				error: false,
			};
		}
	} catch (error) {
		console.error('Error verifying hCaptcha', error);
	}
	return {
		success: false,
		error: true,
	};
}

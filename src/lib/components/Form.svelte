<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { PUBLIC_HCAPTCHA_SITE_KEY, PUBLIC_KEY } from '$env/static/public';

	import { toastStore } from '$lib/stores/toastStore';
	import { verifyHCaptcha } from '$lib/utils/hCaptcha';
	import { functionsBaseUrl } from '$lib/utils/functionsBaseUrl';

	// @TODO Eslint doesn't pick up global @types/hcaptcha
	let hcaptcha: HCaptcha | null = null; // eslint-disable-line no-undef
	let hcaptchaWidgetID: HCaptchaId; // eslint-disable-line no-undef

	onMount(() => {
		if (typeof window !== 'undefined') {
			hcaptcha = window.hcaptcha;
			if (hcaptcha.render) {
				hcaptchaWidgetID = hcaptcha.render('h-captcha-id', {
					sitekey: PUBLIC_HCAPTCHA_SITE_KEY,
					size: 'invisible',
					theme: 'dark',
				});
			}
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			hcaptcha?.remove(hcaptchaWidgetID);
			hcaptcha = null;
		}
	});

	type FormData = {
		'bot-field'?: string; // honeypot
		'other-field'?: string; // honeypot
		name?: string;
		email?: string;
		message?: string;
	};

	let formData: FormData = {};
	enum FormStatus {
		Initial = '',
		Sending = 'Sending ...',
		Sent = 'Form sent',
		Error = 'There was an error sending the form. Please try again',
	}
	let result = FormStatus.Initial;

	$: {
		if (result) {
			toastStore.update((toasts) => toasts.concat(result));
		}
	}

	/* Svelte still doesn't give us types for these */
	function handleChange(event: any): void {
		formData = { ...formData, [event.target.name]: event.target.value };
	}

	/**
	 * Submit netlify form
	 * Svelte still doesn't give us types for these
	 */
	async function handleSubmit(): Promise<void> {
		// reject bots
		if (formData['bot-field'] || formData['other-field']) return;

		const { error, success } = await verifyHCaptcha(hcaptchaWidgetID);
		console.log({ error, success });
		if (error) result = FormStatus.Error;
		if (!success) return;

		result = FormStatus.Sending;
		fetch(`${functionsBaseUrl}/send`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Authorization: PUBLIC_KEY },
			body: JSON.stringify(formData),
		})
			.then(() => (result = FormStatus.Sent))
			.catch(() => (result = FormStatus.Error));
	}
</script>

<svelte:head>
	<!-- At a later date could load when component is in view -->
	<script src="https://js.hcaptcha.com/1/api.js" async defer></script>
</svelte:head>

<form name="contact" on:submit|preventDefault={handleSubmit}>
	<label class="sr-only" aria-hidden>
		Do not fill this out if you are a person:
		<input name="bot-field" on:change={handleChange} />
	</label>
	<label class="sr-only" aria-hidden>
		Leave this if you're human:
		<input name="other-field" on:change={handleChange} />
	</label>

	<label for="name">
		<span>Name</span>
		<input id="name" name="name" type="text" required on:change={handleChange} />
	</label>
	<label for="email">
		<span>Email</span>
		<input id="email" name="email" type="email" required on:change={handleChange} />
	</label>
	<label for="message">
		<span>Message</span>
		<textarea
			id="message"
			name="message"
			rows="4"
			maxlength="512"
			required
			on:change={handleChange}
		/>
	</label>

	<div
		id="h-captcha-id"
		class="h-captcha"
		data-sitekey={PUBLIC_HCAPTCHA_SITE_KEY}
		data-size="invisible"
	/>
	<button type="submit" disabled={result === FormStatus.Sending || result === FormStatus.Sent}>
		Send
	</button>
</form>

<style lang="postcss">
	form {
		display: flex;
		flex-direction: column;
		padding-block-end: 6em;
	}

	label {
		margin: 0.5em 0;
	}

	label > span {
		display: block;
	}

	input,
	textarea {
		border: 1px solid var(--color-gray);
		width: 100%;
		resize: none;
		margin: 0.2em 0;
		transition: box-shadow 150ms ease-in-out;
		padding: 0.2em 0.4em;

		@media (height < 25rem) {
			padding: 0.1em 0.2em;
		}

		@media (prefers-color-scheme: dark) {
			background-color: var(--color-gray);
			color: var(--color-white);
		}
	}

	input,
	textarea,
	button {
		outline-offset: 2px;
		outline: 2px solid transparent;
	}

	input:focus,
	textarea:focus,
	button:focus {
		box-shadow: 0 0 0 3px var(--color-orange);
	}

	input:focus,
	textarea:focus {
		border: 1px solid rgb(52, 52, 52);
	}

	button {
		width: max-content;
		border: none;
		background-color: var(--color-black);
		color: var(--color-white);
		margin-inline: auto;
		transition: filter 300ms ease-in-out;

		@media (prefers-color-scheme: dark) {
			background-color: var(--color-dark-purple);
		}
	}

	button:hover {
		filter: contrast(2);
	}

	button:disabled {
		cursor: not-allowed;
		opacity: 0.666;
		box-shadow: none;
	}
</style>

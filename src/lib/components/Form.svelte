<script lang="ts">
	import { encode } from '$lib/utils/encode';
	import { toastStore } from '$lib/stores/toastStore';

	let formData = {};
	enum FormStatus {
		Initial = '',
		Sending = 'Sending ...',
		Sent = 'Form sent',
		Error = 'There was an error sending the form. Please try again'
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
	function handleSubmit(event: any): void {
		result = FormStatus.Sending;
		fetch('/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: encode({ 'form-name': event.target.name, ...formData })
		})
			.then(() => (result = FormStatus.Sent))
			.catch(() => (result = FormStatus.Error));
	}
</script>

<form
	name="contact"
	data-netlify="true"
	netlify-honeypot="bot-field"
	on:submit|preventDefault={handleSubmit}
>
	<!-- Could add validation on blur in the future -->
	<input type="hidden" name="form-name" value="contact" />
	<label for="contact-name">
		Name<br />
		<input id="contact-name" name="contact-name" type="text" required on:change={handleChange} />
	</label>
	<label for="contact-email">
		Email<br />
		<input id="contact-email" name="contact-email" type="email" required on:change={handleChange} />
	</label>
	<label for="contact-message">
		Message<br />
		<textarea
			id="contact-message"
			name="contact-message"
			rows="6"
			maxlength="512"
			required
			on:change={handleChange}
		/>
	</label>

	<button type="submit" disabled={result === FormStatus.Sending || result === FormStatus.Sent}
		>Send</button
	>
</form>

<style lang="postcss">
	form {
		display: flex;
		flex-direction: column;
	}

	label {
		margin: 0.5em 0;
	}

	form input,
	form textarea {
		border: 1px solid var(--color-black);
		width: 100%;
		resize: none;
		margin: 0.25em 0;
		transition: box-shadow 150ms ease-in-out;
	}

	input:focus,
	textarea:focus,
	button:focus {
		outline-offset: 2px;
		outline: 2px solid transparent;
		box-shadow: 0 0 0 3px var(--color-orange);
	}

	form button {
		width: max-content;
		padding-block: 0.25em;
		padding-inline: 0.5em;
		border: none;
		border-radius: 0.125em;
		background-color: var(--color-black);
		color: var(--color-white);
		margin-inline: auto;
		transition: box-shadow 150ms ease-in-out;
	}

	form button:hover {
		box-shadow: 0 0 0.25em 0.2em var(--color-gray);
	}

	form button:disabled {
		cursor: not-allowed;
		opacity: 0.666;
		box-shadow: none;
	}
</style>

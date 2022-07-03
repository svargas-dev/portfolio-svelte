<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { encode } from '$lib/utils/encode';
	import { toastStore } from '$lib/stores/toastStore';
	import { buildThresholdList, observeIntersection } from '$lib/utils/intersectionObserver';

	export const prerender = true;

	let mainEl: HTMLElement;
	let observedEl: HTMLElement;
	let imageEl: HTMLElement;
	let showScrollToTop = false;

	onMount(() => {
		const options = {
			root: null,
			rootMargin: '0px',
			threshold: buildThresholdList(20)
		};
		observeIntersection(observedEl, effectsOnIntersectionEvent(imageEl), options);
	});

	function effectsOnIntersectionEvent(elementToModify: HTMLElement): IntersectionObserverCallback {
		return function (entries, _observer) {
			entries.forEach((entry) => {
				// manipulate image
				if (elementToModify && entry.intersectionRatio > 0.618) {
					elementToModify.style.transform = `scale(${entry.intersectionRatio})`;
					elementToModify.style.filter = `grayscale(${1 - entry.intersectionRatio})`;
				}

				// scroll up button
				if (showScrollToTop === false && entry.intersectionRatio < 0.2) {
					showScrollToTop = true;
				}

				if (showScrollToTop === true && entry.intersectionRatio >= 0.5) {
					showScrollToTop = false;
				}
			});
		};
	}

	function scrollToTop(): void {
		if (typeof mainEl === 'undefined') return;

		mainEl.scrollTo(0, 0);
	}

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

<div class="wrapper">
	<div bind:this={imageEl} class="image-wrapper">
		<picture>
			<source
				srcset="image/sam-vargas-480.webp 400w, image/sam-vargas-900.webp 800w, image/sam-vargas-1200.webp 1067w"
				type="image/webp"
			/>
			<source
				srcset="image/sam-vargas-480.png 400w, image/sam-vargas-900.png 800w, image/sam-vargas-1200.png 1067w"
				type="image/png"
			/>
			<img class="img--sam-vargas" src="image/sam-vargas-900.png" alt="Sam Vargas" />
		</picture>
	</div>

	<main bind:this={mainEl} class="wrapper-content" dir="ltr">
		<section bind:this={observedEl} id="home">
			<div class="headline">
				<h1>Sam Vargas</h1>
				<h2>Full-stack Engineer</h2>
			</div>
		</section>

		<section id="about">
			<article class="about">
				<h2>About</h2>
				<p>
					I am a maker and creative problem solver dedicated to creating impactful, performant and
					accessible solutions using the best tools for the job.
				</p>
				<p>
					After nearly a decade working at sea as an officer on board merchant ships, specialising
					in polar oceanographic research, I began a new journey into web development and software
					engineering. From books, courses and friends, I dived into the depths and in 2019
					graduated from Ironhack Lisbon &mdash; a top-rated bootcamp focused on today's tech and
					best practices. Fast forward to today, I have skyrocketed start-ups’ Core Web Vitals, SEO
					and a11y.
				</p>
				<p class="this-site">
					Interested? Drop me a line in the form below or check out the <a
						href="https://github.com/svargas-dev"
						target="_blank"
						rel="noopener noreferrer">source</a
					> for this site.
				</p>
			</article>
		</section>

		<section id="contact">
			<div class="contact">
				<h2>Contact</h2>
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
						<input
							id="contact-name"
							name="contact-name"
							type="text"
							required
							on:change={handleChange}
						/>
					</label>
					<label for="contact-email">
						Email<br />
						<input
							id="contact-email"
							name="contact-email"
							type="email"
							required
							on:change={handleChange}
						/>
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

					<button
						type="submit"
						disabled={result === FormStatus.Sending || result === FormStatus.Sent}>Send</button
					>
				</form>
			</div>
		</section>
	</main>

	{#if showScrollToTop}
		<button class="scroll-to-top" on:click={scrollToTop} transition:fade>Back to top </button>
	{/if}
</div>

<style lang="postcss">
	.image-wrapper,
	.image-wrapper picture,
	.image-wrapper picture img {
		margin: 0;
		padding: 0;
		opacity: 1;
		transform-origin: bottom left;
		will-change: transform;
		transition: transform 150ms linear, filter 150ms linear;
		position: fixed;
		bottom: 0;
		left: 0;

		@media (max-width: 1024px) {
			width: 42vw;
		}

		@media (min-width: 1025px) {
			height: 100vh;
		}

		/* hide image with Android onscreen keyboard
       as it can make reading the form difficult
    */
		@media (max-height: 400px) {
			opacity: 0;
		}
	}

	a {
		text-decoration: none;
		padding-inline: 0.1ch;
		padding-block: 0.25ch;
		position: relative;
		color: var(--color-black);
	}

	a:focus {
		outline: 0.2em dashed var(--color-black);
	}

	a::before {
		content: '';
		position: absolute;
		z-index: 1;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		border-block-end: 0.2em solid var(--color-orange);
		transition: border 300ms ease-in-out;
	}

	a:active::before,
	a:focus::before {
		border-block-end: 0.4em solid var(--color-orange-alpha);
	}

	a::after {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		transition: border 150ms ease-in-out;
	}

	a:hover::after {
		border-block-end: 0.75em solid var(--color-orange-alpha);
	}

	.scroll-to-top {
		width: max-content;
		height: 2em;
		position: fixed;
		z-index: 1;
		background-color: var(--color-white-alpha);
		border: none;
		border-bottom: 0.25em solid var(--color-gray);
		transition: all 300ms ease;
	}

	.scroll-to-top:focus {
		filter: invert(1);
		outline: none;
	}

	.wrapper-content {
		position: fixed;
		width: 100%;
		height: 100vh;
		overflow: auto;
		/* fade out effect top and bottom visible on scroll
     * 2nd linear gradient preserves browser scrollbar styling
     */
		mask-image: linear-gradient(transparent 3%, black 15%, black 85%, transparent 97%),
			linear-gradient(to right, transparent calc(100% - 1rem), black calc(100% - 1rem));
		-webkit-mask-image: linear-gradient(transparent 3%, black 15%, black 85%, transparent 97%),
			linear-gradient(to right, transparent calc(100% - 1rem), black calc(100% - 1rem));
		scroll-snap-type: y mandatory;
		overscroll-behavior: none;
	}

	.wrapper {
		position: fixed;
		width: 100vw;
		height: 100vh;
	}

	section {
		width: 100%;
		height: 100vh;
		display: grid;
		scroll-snap-align: center;
		grid-template-columns: repeat(8, 1fr);
		grid-template-rows: repeat(8, 1fr);
	}

	.headline {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		transform: rotateZ(-10deg);
	}

	.headline h1,
	.headline h2 {
		margin: 0;
		border-radius: 0.25em;
	}

	.headline h1 {
		width: max-content;
		border-top: 0.25em solid var(--color-green);
		padding-block: 0.85rem;
	}

	.headline h2 {
		width: 66.666%;
		border-bottom: 0.25em solid var(--color-purple);
		padding-block: 1rem;
	}

	.contact form {
		display: flex;
		flex-direction: column;
	}

	.contact label {
		margin: 0.5em 0;
	}

	.contact form input,
	.contact form textarea {
		width: 100%;
		resize: none;
		margin: 0.25em 0;
	}

	input:focus,
	textarea:focus {
		outline: 2px solid var(--color-orange);
	}

	.contact form button {
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

	.contact form button:focus {
		outline: 2px solid var(--color-orange);
	}

	.contact form button:hover {
		box-shadow: 0 0 0.25em 0.2em var(--color-gray);
	}

	.contact form button:disabled {
		cursor: not-allowed;
		opacity: 0.666;
		box-shadow: none;
	}

	.about,
	.contact {
		position: relative;
		top: 12.5%;
	}

	/* Mobile */
	@media (max-width: 480px) {
		.about,
		.contact {
			grid-column: 2 / 8;
			grid-row: 1 / 4;
			padding-block: 2em;
		}
	}

	/* Mobile + tablet */
	@media (max-width: 1024px) {
		.wrapper {
			background: linear-gradient(var(--color-orange) 0.5vw, var(--color-white) 0.5vw);
		}

		.scroll-to-top {
			bottom: 5em;
			right: 2em;
		}

		.headline {
			grid-column: 3 / 7;
			grid-row: 4;
		}
	}

	/* Mobile - android onscreen keyboard fix */
	@media (max-width: 1024px) and (max-height: 480px) {
		.scroll-to-top {
			display: none;
		}
	}

	/* Tablets */
	@media (min-width: 481px) and (max-width: 1024px) {
		.headline {
			grid-column: 4 / 9;
			grid-row: 4;
		}

		.about,
		.contact {
			grid-column: 4 / 8;
			grid-row: 1 / 6;
			padding-block: 3em;
		}
	}

	/* Desktop */
	@media (min-width: 1025px) {
		.wrapper {
			background: linear-gradient(to right, var(--color-orange) 0.5vw, var(--color-white) 0.5vw);
		}

		.scroll-to-top {
			bottom: 2em;
			left: 0;
			right: 0;
			margin-inline: auto;
		}

		.headline {
			grid-column: 5 / 8;
			grid-row: 4 / 5;
		}

		.about,
		.contact {
			grid-column: 4 / 8;
			grid-row: 1 / 7;
		}
	}
</style>

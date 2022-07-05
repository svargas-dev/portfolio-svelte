<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Form from '$lib/components/Form.svelte';
	import { buildThresholdList, observeIntersection } from '$lib/utils/intersectionObserver';
	import { prefersReducedMotion } from '$lib/utils/mediaQueries';
	import { menuButtonRefStore } from '$lib/stores/menuStore';

	export const prerender = true;

	let mainEl: HTMLElement;
	let observedEl: HTMLElement;
	let imageEl: HTMLElement;
	let showScrollToTop = false;

	onMount(() => {
		const options = {
			root: null,
			rootMargin: '0px',
			threshold: buildThresholdList(32)
		};
		observeIntersection(observedEl, effectsOnIntersectionEvent(imageEl), options);
	});

	function effectsOnIntersectionEvent(elementToModify: HTMLElement): IntersectionObserverCallback {
		return function (entries, _observer) {
			entries.forEach((entry) => {
				const reduceMotion = prefersReducedMotion();
				// manipulate image
				if (!reduceMotion && elementToModify && entry.intersectionRatio > 0.618) {
					elementToModify.style.transform = `scale(${entry.intersectionRatio})`;
					elementToModify.style.filter = `grayscale(${1 - entry.intersectionRatio})`;
				}

				if (reduceMotion && elementToModify && entry.intersectionRatio < 0.3) {
					elementToModify.style.transform = `scale(0.618)`;
					elementToModify.style.filter = `grayscale(0.618)`;
				}

				if (reduceMotion && elementToModify && entry.intersectionRatio >= 0.3) {
					elementToModify.style.transform = `scale(1)`;
					elementToModify.style.filter = `grayscale(0)`;
				}

				// scroll up button
				if (showScrollToTop === false && entry.intersectionRatio < 0.2) {
					showScrollToTop = true;
				}

				if (showScrollToTop === true && entry.intersectionRatio >= 0.2) {
					showScrollToTop = false;
				}
			});
		};
	}

	let menuButtonRef: HTMLButtonElement | null;
	menuButtonRefStore.subscribe((value) => {
		menuButtonRef = value;
	});

	function scrollToTop(): void {
		if (typeof mainEl === 'undefined' || menuButtonRef === null) return;

		mainEl.scrollTo(0, 0);
		menuButtonRef.focus();
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
				<p>
					Interested? Drop me a line in the form below or check out the <a
						class="link link-underline"
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
				<Form />
			</div>
		</section>
	</main>

	{#if showScrollToTop}
		<button class="scroll-to-top" on:click={scrollToTop} transition:fade>Back to top </button>
	{/if}
</div>

<style lang="postcss">
	.wrapper {
		position: fixed;
		width: 100vw;
		height: 100vh;
	}

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

		@media (prefers-reduced-motion: reduce) {
			transition: transform 150ms ease-in-out;
		}

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
		padding: 0 0.25ch;
	}

	a:focus {
		outline: 0.2em dashed var(--color-foreground);

		@supports selector(:focus-visible) {
			outline: none;

			&:focus-visible {
				outline: 0.2em dashed var(--color-foreground);
			}
		}
	}

	a:focus::after {
		border-block-end: 0.3em solid var(--color-purple);
	}

	@supports selector(:focus-visible) {
		a:focus-visible::after {
			border-block-end: none;
			transform: unset;
			opacity: unset;
			transition: unset;
		}
	}

	.scroll-to-top {
		position: relative;
		width: max-content;
		height: 2em;
		position: fixed;
		z-index: 1;
		background-color: var(--color-white-alpha);
		border: none;
		border-bottom: 0.25em solid var(--color-gray);
		transition: all 300ms ease;

		@media (prefers-color-scheme: dark) {
			background-color: unset;
			border-bottom: 0.25em solid var(--color-white-alpha);
		}
	}

	.scroll-to-top:focus {
		outline: none;
		border-radius: 0.125em;
	}

	.scroll-to-top::after {
		content: '\2191'; /* unicode up arrow */
		font-size: 2em;
		width: 100%;
		height: 100%;
		position: absolute;
		top: -1em;
		right: 0;
		left: 0;
		opacity: 0;
		transform: translateY(100%);
		transition: all 150ms ease-in-out;
		color: var(--color-gray);

		@media (prefers-color-scheme: dark) {
			color: var(--color-white);
		}
	}

	.scroll-to-top:focus::after,
	.scroll-to-top:hover::after {
		opacity: 1;
		transform: translateY(0);
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
		overscroll-behavior: none;

		@media (prefers-reduced-motion: no-preference) {
			scroll-snap-type: y mandatory;
		}
	}

	section {
		width: 100%;
		height: 100vh;
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		grid-template-rows: repeat(8, 1fr);

		@media (prefers-reduced-motion: no-preference) {
			scroll-snap-align: center;
		}
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
	}

	.headline h1 {
		width: max-content;
		border-top-left-radius: 0.25em;
		border-top-right-radius: 0.25em;
		border-top: 0.25em solid var(--color-green);
		padding-block: 0.85rem;
	}

	.headline h2 {
		width: 66.666%;
		border-bottom-left-radius: 0.25em;
		border-bottom-right-radius: 0.25em;
		border-bottom: 0.25em solid var(--color-purple);
		padding-block: 1rem;
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
			background: linear-gradient(var(--color-orange) 0.5vw, var(--color-background) 0.5vw);
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
			background: linear-gradient(
				to right,
				var(--color-orange) 0.5vw,
				var(--color-background) 0.5vw
			);
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

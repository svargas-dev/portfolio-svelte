<script lang="ts">
	import { onMount } from 'svelte';
	import Form from '$lib/components/Form.svelte';
	import ScrollToTop from '$lib/components/ScrollToTop.svelte';
	import { buildThresholdList, observeIntersection } from '$lib/utils/intersectionObserver';
	import { prefersReducedMotion } from '$lib/utils/mediaQueries';
	import { menuButtonRefStore } from '$lib/stores/menuStore';

	let mainEl: HTMLElement | null = null;
	let observedEl: HTMLElement | null = null;
	let imageWrapperEl: HTMLElement | null = null;
	let showScrollToTop = false;

	onMount(() => {
		const options = {
			root: null,
			rootMargin: '0px',
			threshold: buildThresholdList(32),
		};
		if (observedEl && imageWrapperEl)
			observeIntersection(observedEl, effectsOnIntersectionEvent(imageWrapperEl), options);
	});

	// SvelteKit's eslint config fails as return type is not available in SSR...
	// It's not smart enough to realise this is only ever run on the client
	// eslint-disable-next-line
	function effectsOnIntersectionEvent(elementToModify: HTMLElement): IntersectionObserverCallback {
		return function (entries, _observer) {
			entries.forEach((entry) => {
				const reduceMotion = prefersReducedMotion();
				// manipulate image
				if (!reduceMotion && elementToModify && entry.intersectionRatio > 0.618) {
					elementToModify.style.transform = `scale(${entry.intersectionRatio})`;
					elementToModify.style.filter = `grayscale(${1 - entry.intersectionRatio})`;
				}

				if (reduceMotion && elementToModify && entry.intersectionRatio < 0.5) {
					elementToModify.style.transform = `scale(0.618)`;
					elementToModify.style.filter = `grayscale(0.618)`;
				}

				if (reduceMotion && elementToModify && entry.intersectionRatio >= 0.5) {
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

	// Move focus to menu button when using scroll up button
	let menuButtonEl: HTMLButtonElement | null;
	menuButtonRefStore.subscribe((value) => {
		menuButtonEl = value;
	});

	// weird hack for onload events not firing reliably. not sure if it's a Svelte bug
	$: if (imageWrapperEl) {
		const imgEl = imageWrapperEl.children[2] as HTMLImageElement;
		imgEl.classList.add('img-loaded');
	}
</script>

<div class="wrapper">
	<picture bind:this={imageWrapperEl} class="image-wrapper">
		<source
			srcset="image/sam-vargas-480.webp 400w, image/sam-vargas-900.webp 800w, image/sam-vargas-1200.webp 1067w"
			type="image/webp"
		/>
		<source
			srcset="image/sam-vargas-480.png 400w, image/sam-vargas-900.png 800w, image/sam-vargas-1200.png 1067w"
			type="image/png"
		/>
		<img src="image/sam-vargas-900.png" alt="Sam Vargas" />
	</picture>

	<main bind:this={mainEl} class="wrapper-content" dir="ltr">
		<section bind:this={observedEl} id="home">
			<div class="headline">
				<h1>Sam Vargas</h1>
				<h2>Full-Stack Engineer</h2>
			</div>
		</section>

		<section id="about">
			<article class="about">
				<h2>About</h2>
				<p>
					I am a maker and creative problem solver dedicated to creating impactful, accessible and
					performant solutions using the best tools for the job.
				</p>
				<p>
					After nearly a decade working at sea as an officer on board British merchant ships,
					specialising in polar oceanographic research, I began a new journey into web development
					and software engineering. From books, courses and friends, I dived into the depths and in
					2019 graduated from Ironhack Lisbon &mdash; a top-rated bootcamp focused on today's tech
					and best practices. Fast forward to today, I have skyrocketed start-ups' Core Web Vitals,
					SEO and a11y.
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

			<!-- For SEO -->
			<span class="sr-only" aria-hidden="true">
				Full Stack, Front End, Frontend, React, React Native, Svelte, Web Developer,
				Accessibility, a11y, Python, Django, Django REST Framework, Go, Golang, Node, Express, Rest APIs,
				TypeScript
			</span>
		</section>

		<section id="contact">
			<div class="contact">
				<h2>Contact</h2>
				<Form />
			</div>
		</section>
	</main>

	<ScrollToTop {showScrollToTop} targetEl={mainEl} focusEl={menuButtonEl} />
</div>

<style lang="postcss">
	.wrapper {
		position: fixed;
		width: 100vw;
		height: 100vh;
	}

	.image-wrapper,
	.image-wrapper img {
		transform-origin: bottom left;
	}

	.image-wrapper {
		position: fixed;
		margin: 0;
		padding: 0;
		bottom: 0;
		left: 0;
		width: max-content;
		height: max-content;
		transition: transform 0.15s linear, filter 0.5s linear;
		will-change: transform;

		@media (width <= 64rem) {
			width: 42vw;
		}

		@media (width <= 64rem) and (height <= 30rem) {
			width: 16vw;
		}

		@media (width > 64rem) {
			height: 100vh;
		}

		/* hide image with Android onscreen keyboard
       as it can make reading the form difficult
    */
		@media (width <= 30rem) and (height < 38rem) {
			opacity: 0;
		}
	}

	.image-wrapper img {
		display: block;
		transition: filter 0.5s linear, opacity 0.5s linear;
		opacity: 0;
		filter: blur(5px) grayscale(1);
		max-width: 100%;
		max-height: 100%;

		@media (prefers-reduced-motion: reduce) {
			transition: transform 150ms ease-in-out;
		}
	}

	.image-wrapper::after {
		content: '';
		position: absolute;
		z-index: 100;
		width: 100%;
		height: 100%;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: no-repeat bottom left / 100% url('/image/sam-outline-black.svg');

		@media (prefers-color-scheme: dark) {
			background: no-repeat bottom left / 100% url('/image/sam-outline-white.svg');
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
		@media (height > 24rem) {
			position: relative;
			top: 12.5%;
		}
	}

	/* Mobile */
	@media (width < 30rem) {
		.about,
		.contact {
			grid-column: 2 / 8;
			grid-row: 1 / 4;
			padding-block: 2em;
		}
	}

	/* Mobile + tablet */
	@media (width <= 64rem) {
		.wrapper {
			background: linear-gradient(var(--color-orange) 0.5vw, var(--color-background) 0.5vw);
		}

		.headline {
			grid-column: 3 / 7;
			grid-row: 4;
		}

		.about h2,
		.contact h2 {
			margin-block-start: 0;
			margin-block-end: 0.2em;
		}
	}

	/* Tablets */
	@media (30rem <= width <= 64rem) {
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
	@media (width > 64rem) {
		.wrapper {
			background: linear-gradient(
				to right,
				var(--color-orange) 0.5vw,
				var(--color-background) 0.5vw
			);
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

	/* Big screens! */
	@media (width > 86rem) {
		.about,
		.contact {
			grid-column: 4 / 6;
			grid-row: 1 / 7;
		}
	}
</style>

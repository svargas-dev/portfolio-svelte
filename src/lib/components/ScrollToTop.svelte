<script lang="ts">
	import { fade } from 'svelte/transition';

	export let showScrollToTop: boolean;
	export let targetEl: HTMLElement | null;
	export let focusEl: HTMLButtonElement | null;

	$: {
		console.log(showScrollToTop, { targetEl, focusEl });
	}

	function scrollToTop(): void {
		if (!targetEl) return;

		targetEl.scrollTo(0, 0);
		if (focusEl) focusEl.focus();
	}
</script>

{#if showScrollToTop}
	<button class="scroll-to-top" on:click={scrollToTop} transition:fade>Back to top </button>
{/if}

<style lang="postcss">
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

		@media (width <=64rem) {
			bottom: 5em;
			right: 2em;
		}

		/* Mobile - android onscreen keyboard fix */
		@media (width <= 49rem) and (height < 25rem) {
			display: none;
		}

		@media (width > 64rem) {
			bottom: 2em;
			left: 0;
			right: 0;
			margin-inline: auto;
		}

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
</style>

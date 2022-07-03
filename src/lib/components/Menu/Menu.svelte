<script lang="ts">
	import MenuButton from './MenuButton.svelte';
	import { trapFocus } from '$lib/utils/trapFocus';

	export let isOpen = false;
	export let toggleOpen: () => void;
	export let hideMenu: () => void;

	let navWrapperEl: HTMLElement;

	function handleKeydown(e: KeyboardEvent): void {
		if (e.key === 'Escape') hideMenu();
	}

	let trapFocusCleanup: (() => void) | undefined;
	$: {
		if (navWrapperEl && isOpen) trapFocusCleanup = trapFocus(navWrapperEl);
		if (!isOpen && trapFocusCleanup) trapFocusCleanup();
	}

	$: navClass = isOpen ? 'nav--open' : '';
</script>

<aside
	bind:this={navWrapperEl}
	on:click={toggleOpen}
	on:keydown={isOpen ? handleKeydown : undefined}
>
	<MenuButton {isOpen} />

	<nav class={navClass} aria-hidden={!isOpen}>
		<a href="#about" tabindex={isOpen ? 0 : -1}>About</a>
		<a href="#contact" tabindex={isOpen ? 0 : -1}> Contact</a>
	</nav>
</aside>

<style lang="postcss">
	nav {
		position: absolute;
		z-index: 1;
		top: 0;
		right: 0;
		margin-left: auto;
		width: clamp(15em, 20vw, 360px);
		height: 100%;
		background-color: var(--color-black);
		display: flex;
		flex-direction: column;
		padding-inline: 3em;
		padding-block: 9em;
		transform: translateX(105vw);
		opacity: 0;

		@media (--motionNotOK) {
			transition: opacity 200ms ease-in-out;
		}

		@media (--motionOK) {
			transition: transform 400ms ease-in-out;
		}
	}

	/**
  * Clicking outside of visible navbar closes sidebar
  */
	nav::before {
		content: '';
		width: 100vw;
		height: 100vh;
		position: absolute;
		z-index: -1;
		top: 0;
		right: 0;
		background-color: transparent;
	}

	.nav--open {
		transform: translateX(0);
		opacity: 1;
	}

	.nav--open::before {
		background-color: rgba(0, 0, 0, 0.08);
		transition: background-color ease-in-out 300ms 300ms;
	}

	a {
		width: max-content;
		text-decoration: none;
		font-size: clamp(1.25em, 0.5em + 2vw, 1.5em);
		font-family: var(--font-sans);
		margin: 0.5em 0;
		padding: 0.25em;
		color: var(--color-white);
	}

	a:focus,
	a:active {
		outline: 2px dashed white;
	}
</style>

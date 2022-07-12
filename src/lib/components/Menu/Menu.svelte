<script lang="ts">
	import { onMount } from 'svelte';
	import type { ThemeType } from '$lib/types/theme.types';

	import MenuButton from './MenuButton.svelte';
	import ThemeButton from './ThemeButton.svelte';
	import { trapFocus } from '$lib/utils/trapFocus';

	export let isOpen = false;
	export let toggleOpen: () => void;
	export let hideMenu: () => void;

	let navWrapperEl: HTMLElement | null = null;

	function handleKeydown(e: KeyboardEvent): void {
		if (e.key === 'Escape') hideMenu();
	}

	let trapFocusCleanup: (() => void) | undefined;
	$: {
		if (trapFocusCleanup && !isOpen) trapFocusCleanup();
		if (navWrapperEl && isOpen) {
			trapFocusCleanup = trapFocus(navWrapperEl, toggleOpen);
		}
	}

	$: asideClass = isOpen ? 'aside--open' : '';
</script>

<div bind:this={navWrapperEl}>
	<MenuButton {isOpen} {toggleOpen} />

	<aside
		class={asideClass}
		on:click={toggleOpen}
		on:keydown={isOpen ? handleKeydown : undefined}
		aria-hidden={!isOpen}
	>
		<div on:click|stopPropagation>
			<nav>
				<a on:click={toggleOpen} href="#about" tabindex={isOpen ? 0 : -1}>About</a>
				<a on:click={toggleOpen} href="#contact" tabindex={isOpen ? 0 : -1}> Contact</a>
			</nav>
			<ThemeButton {isOpen} />
		</div>
	</aside>
</div>

<style lang="postcss">
	div {
		position: absolute;
		top: 0;
		right: 0;
	}
	aside {
		position: absolute;
		z-index: 1;
		top: 0;
		right: 0;
		height: 100%;
		opacity: 0;
		transform: translateX(105vw);

		@media (prefers-reduced-motion: reduce) {
			transition: opacity 200ms ease-in-out;
		}

		@media (prefers-reduced-motion: no-preference) {
			transition: transform 400ms ease-in-out;
		}

		/**
    * Clicking outside of visible navbar closes sidebar
    */
		&::before {
			content: '';
			width: 100vw;
			height: 100vh;
			position: absolute;
			z-index: -1;
			top: 0;
			right: 0;
			background-color: transparent;
		}
	}

	.aside--open {
		transform: translateX(0);
		opacity: 1;
	}

	.aside--open::before {
		background-color: rgba(0, 0, 0, 0.1);
		transition: background-color ease-in-out 300ms 300ms;
	}

	nav {
		position: relative;
		width: clamp(15em, 20vw, 360px);
		height: 100vh;
		max-height: -webkit-fill-available;
		background-color: var(--color-black);
		display: flex;
		flex-direction: column;
		padding-inline: 3em;
		padding-block: 9em;

		@supports (height: 100dvh) {
			height: 100dvh;
		}

		@media (prefers-color-scheme: dark) {
			background-color: black;
		}
	}

	a {
		width: max-content;
		text-decoration: none;
		font-size: clamp(1.25em, 0.5em + 2vw, 1.5em);
		font-family: var(--font-sans);
		margin: 0.5em 0;
		padding: 0.25em;
		color: var(--color-white);
		position: relative;
	}

	a:focus,
	a:active {
		outline: 2px dashed white;

		@supports selector(:focus-visible) {
			outline: none;
		}
	}

	a::after {
		content: '';
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		border-block-end: 0.3em solid var(--color-green);
		transform-origin: bottom;
		transform: scaleY(0);
		opacity: 0;
		transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
	}

	a:hover::after,
	a:focus::after {
		opacity: 1;
		transform: scaleY(1);
	}
</style>

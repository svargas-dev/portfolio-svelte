<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import MenuButton from './MenuButton.svelte';
	import { trapFocus } from '$lib/utils/trapFocus';
	import type { ThemeType } from '$lib/stores/themeStore';
	import { themeStore } from '$lib/stores/themeStore';
	import { prefersColorScheme } from '$lib/utils/mediaQueries';
	import { supportsCssProperty } from '$lib/utils/supports';

	export let isOpen = false;
	export let toggleOpen: () => void;
	export let hideMenu: () => void;

	let navWrapperEl: HTMLElement | null = null;
	let themeButtonWrapperEl: HTMLDivElement | null = null;
	let theme: ThemeType;

	onMount(() => {
		const uaColorScheme = prefersColorScheme();
		const lsColorScheme = localStorage.getItem('theme');
		const themeToSet = (lsColorScheme ?? uaColorScheme) as ThemeType;
		if (themeToSet) themeStore.set(themeToSet);
		theme = uaColorScheme;
	});

	function handleToggleTheme(themeToSet: ThemeType) {
		if (!themeToSet) return;
		themeStore.set(themeToSet);
		theme = themeToSet;
		localStorage.setItem('theme', theme);
	}

	function handleKeydown(e: KeyboardEvent): void {
		if (e.key === 'Escape') hideMenu();
	}

	let trapFocusCleanup: (() => void) | undefined;
	$: {
		if (navWrapperEl && isOpen) trapFocusCleanup = trapFocus(navWrapperEl);
		if (!isOpen && trapFocusCleanup) trapFocusCleanup();
	}

	$: navClass = isOpen ? 'nav--open' : '';

	// getting around the mobile height problem
	// to keep switch theme button in bottom right on all devices
	$: if (
		typeof window !== 'undefined' &&
		!supportsCssProperty('height', '100dvh') &&
		themeButtonWrapperEl &&
		isOpen
	) {
		const innerHeight = window.innerHeight;
		if (themeButtonWrapperEl.style.bottom !== `calc(100% - ${innerHeight}px + 1em)`) {
			themeButtonWrapperEl.style.bottom = `calc(100% - ${innerHeight}px + 1em)`;
		}
	}
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

		<div bind:this={themeButtonWrapperEl} class="theme-button">
			{#if theme === 'light'}
				<button
					on:click|stopPropagation={() => handleToggleTheme('dark')}
					class="dark"
					transition:fade
				>
					<span class="sr-only">Change to dark theme</span>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em"
						><path fill="none" d="M0 0h24v24H0z" /><path
							d="M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6C21.662 17.854 17.316 22 12.001 22 6.477 22 2 17.523 2 12c0-5.315 4.146-9.661 9.38-9.981z"
						/></svg
					>
				</button>
			{:else if theme === 'dark'}
				<button
					on:click|stopPropagation={() => handleToggleTheme('light')}
					class="light"
					transition:fade
				>
					<span class="sr-only">Change to light theme</span>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em"
						><path fill="none" d="M0 0h24v24H0z" /><path
							d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"
						/></svg
					>
				</button>
			{/if}
		</div>
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
		max-height: -webkit-fill-available;
		background-color: var(--color-black);
		display: flex;
		flex-direction: column;
		padding-inline: 3em;
		padding-block: 9em;
		transform: translateX(105vw);
		opacity: 0;

		@supports (height: 100dvh) {
			height: 100dvh;
		}

		@media (prefers-color-scheme: dark) {
			background-color: black;
		}

		@media (prefers-reduced-motion: reduce) {
			transition: opacity 200ms ease-in-out;
		}

		@media (prefers-reduced-motion: no-preference) {
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
		background-color: rgba(0, 0, 0, 0.1);
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

	.theme-button {
		width: 2em;
		height: 2em;
		position: absolute;
		bottom: 2rem;
		right: 1.25rem;
		padding: 0;
		margin: 0;
	}

	button {
		position: absolute;
		padding: 0.5em;
		margin: 0;
		border: none;
		fill: var(--color-white);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	button:focus,
	button:active {
		outline: 2px solid transparent;
		outline-offset: 2px;
		box-shadow: 0 0 0 0.2em var(--color-green);
	}

	.light {
		background-color: var(--color-orange);
	}

	.dark {
		background-color: var(--color-purple);
	}

	button svg {
		fill: var(--color-white);
	}
</style>

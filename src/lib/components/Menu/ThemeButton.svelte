<script lang="ts">
	import { supportsCssProperty } from '$lib/utils/supports';
	import type { ThemeType } from '$lib/types/theme.types';
	import { onMount } from 'svelte';

	export let isOpen: boolean;

	let themeButtonWrapperEl: HTMLDivElement | null;
	let darkThemeButton: HTMLButtonElement | null = null;
	let lightThemeButton: HTMLButtonElement | null = null;

	let theme: ThemeType;
	onMount(() => {
		theme = document?.querySelector('html')?.getAttribute('data-theme') as ThemeType;
	});

	function handleToggleTheme(themeToSet: ThemeType): void {
		if (!themeToSet) return;
		theme = themeToSet;

		if (themeToSet === 'light' && darkThemeButton) {
			darkThemeButton.focus();
		}

		if (themeToSet === 'light' && lightThemeButton) {
			lightThemeButton.focus();
		}

		document.querySelector('html')?.setAttribute('data-theme', themeToSet);
		localStorage.setItem('theme', themeToSet);
	}

	// getting around the mobile height problem
	// to keep switch theme button in bottom right on all devices
	$: if (
		typeof window !== 'undefined' &&
		!supportsCssProperty('height', '100dvh') &&
		themeButtonWrapperEl &&
		isOpen
	) {
		const innerHeight = window.innerHeight;
		if (themeButtonWrapperEl.style.bottom !== `calc(100% - ${innerHeight}px + 1.5rem)`) {
			themeButtonWrapperEl.style.bottom = `calc(100% - ${innerHeight}px + 1.5em)`;
		}
	}
</script>

<div bind:this={themeButtonWrapperEl} class="theme-button" aria-hidden={isOpen ? false : true}>
	<button
		bind:this={darkThemeButton}
		on:click={() => handleToggleTheme('dark')}
		class="dark dark-bg"
		tabindex={isOpen && theme === 'light' ? 0 : -1}
	>
		<span class="sr-only">Change to dark theme</span>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em"
			><path fill="none" d="M0 0h24v24H0z" /><path
				d="M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6C21.662 17.854 17.316 22 12.001 22 6.477 22 2 17.523 2 12c0-5.315 4.146-9.661 9.38-9.981z"
			/></svg
		>
	</button>
	<button
		bind:this={lightThemeButton}
		on:click={() => handleToggleTheme('light')}
		class="light light-bg"
		tabindex={isOpen && theme === 'dark' ? 0 : -1}
	>
		<span class="sr-only">Change to light theme</span>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em">
			<path fill="none" d="M0 0h24v24H0z" /><path
				d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"
			/>
		</svg>
	</button>
</div>

<style lang="postcss">
	.theme-button {
		width: 2em;
		height: 2em;
		position: absolute;
		bottom: 1.5rem;
		right: 2rem;
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
		transition: visibility 250ms ease, opacity 250ms ease;
	}

	button:focus,
	button:active {
		outline: 2px solid transparent;
		outline-offset: 2px;
		box-shadow: 0 0 0 0.2em var(--color-green);
	}

	.light-bg {
		background-color: var(--color-dark-orange);
	}

	.dark-bg {
		background-color: var(--color-dark-purple);
	}

	button svg {
		fill: var(--color-white);
	}
</style>

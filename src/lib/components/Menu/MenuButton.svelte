<script lang="ts">
	/**
	 * A good candidate for SVG animation instead here
	 */
	import { fade } from 'svelte/transition';
	import { menuButtonRefStore } from '$lib/stores/menuStore';

	export let isOpen: boolean;
	export let toggleOpen: () => void;

	let menuButtonRef: HTMLButtonElement | null;
	$: {
		if (menuButtonRef) menuButtonRefStore.set(menuButtonRef);
	}

	$: buttonClass = isOpen
		? 'umami--click--menu menu-button menu-button--open'
		: 'umami--click--menu menu-button';
	$: buttonTextClass = isOpen ? 'menu-button__text menu-button__text--open' : 'menu-button__text';

	$: menuClass = isOpen ? 'v-hidden' : 'menu-icon';
	$: closeClass = isOpen ? 'close-icon' : 'v-hidden';
</script>

<button bind:this={menuButtonRef} class={buttonClass} on:click={toggleOpen}>
	<div class={buttonTextClass} role="status" aria-live="polite">
		{#if !isOpen}
			<span transition:fade>MENU</span>
		{:else}
			<span class="sr-only" in:fade={{ delay: 400, duration: 1 }} out:fade={{ duration: 1 }}>
				CLOSE
			</span>
		{/if}
	</div>

	<div class={menuClass} aria-hidden={true}>
		<div class="menu-atom menu-dot menu-dot-1" />
		<div class="menu-atom menu-dot menu-dot-2" />
		<div class="menu-atom menu-dot menu-dot-3" />
		<div class="menu-atom menu-dot menu-dot-4" />
	</div>
	<div class={closeClass} aria-hidden={true}>
		<div />
		<div />
	</div>
</button>

<style lang="postcss">
	.menu-button {
		position: fixed;
		z-index: 3;
		top: 1.5em;
		right: 1.5em;
		height: 3em;
		width: 3em;
		display: flex;
		align-items: center;
		border: none;
		font-weight: 600;
		font-family: var(--font-sans);
		color: var(--color-foreground);
		background-color: transparent;
	}

	.menu-button:focus,
	.menu-button:active {
		outline: 0.2em dashed var(--color-foreground);

		@supports selector(:focus-visible) {
			outline: none;

			&:focus-visible {
				outline: 0.2em dashed var(--color-foreground);
			}
		}
	}

	.menu-button--open:focus,
	.menu-button--open:active {
		transition: none;
		outline: 0.2em dashed var(--color-background);

		@supports selector(:focus-visible) {
			outline: none;

			&:focus-visible {
				outline: 0.2em dashed var(--color-white);
			}
		}
	}

	.menu-button__text {
		position: absolute;
		transform: translateX(-3.75em);

		@media (prefers-reduced-motion: no-preference) {
			transition: transform 300ms;
		}
	}

	.menu-button__text--open {
		transform: translateX(50vw);
	}

	.menu-icon,
	.close-icon {
		width: 3em;
		height: 3em;
		position: absolute;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.menu-atom {
		width: 0.5em;
		height: 0.5em;
		border-radius: 0.25em;
		background-color: var(--color-green);
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: auto auto;
		will-change: transform;
	}

	.v-hidden {
		visibility: hidden;
	}

	.menu-dot-1 {
		transform: translateX(-0.75em);
	}

	.menu-dot-2 {
		transform: translateY(-0.75em);
	}

	.menu-dot-3 {
		transform: translateY(0.75em);
	}

	.menu-dot-4 {
		transform: translateX(0.75em);
	}

	.menu-button:hover .menu-dot {
		@media (pointer: fine) {
			transform: translate(0, 0);
		}
	}

	.menu-atom,
	.close-icon div {
		transition: transform 80ms;

		@media (prefers-reduced-motion: no-preference) {
			transition: transform ease-in 150ms;
		}
	}
	.close-icon div {
		width: 2em;
		height: 0.5em;
		position: absolute;
		background-color: var(--color-green);
	}

	.close-icon div:nth-child(odd) {
		transform: rotate(45deg);
	}

	.close-icon div:nth-child(even) {
		transform: rotate(-45deg);
	}

	.menu-button:hover .close-icon div {
		@media (pointer: fine) {
			transform: scaleX(0.25);
			border-radius: 100%;
		}
	}
</style>

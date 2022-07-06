<script lang="ts">
	import Menu from '$lib/components/Menu/Menu.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Toast from '$lib/components/Toast/Toast.svelte';
	import type { ThemeType } from '$lib/stores/themeStore';
	import { themeStore } from '$lib/stores/themeStore';

	import '@fontsource/ibm-plex-sans/latin-400.css';
	import '@fontsource/ibm-plex-sans/latin-500.css';
	import '@fontsource/ibm-plex-sans/latin-600.css';
	import '@fontsource/ibm-plex-serif/latin-700.css';
	import 'normalize.css';
	import '../app.css';
	import { onMount } from 'svelte';

	let isOpen = false;
	let theme: ThemeType;
	themeStore.subscribe((value) => {
		theme = value;
	});

	onMount(() => {
		if (document) {
			const $themeEl = document.getElementById('theme');
			const theme = $themeEl?.getAttribute('data-theme');
			console.log(theme);
			if (theme) themeStore.set(theme as ThemeType);
		}
	});

	function toggleOpen(): void {
		isOpen = !isOpen;
	}

	function hideMenu(): void {
		isOpen = false;
	}
</script>

<div data-theme={theme}>
	<Menu {isOpen} {toggleOpen} {hideMenu} />
	<div aria-hidden={isOpen}>
		<slot />
	</div>
	<Footer />
</div>

<Toast />

<style>
	div {
		width: 100%;
		height: 100%;
		position: relative;
	}
</style>

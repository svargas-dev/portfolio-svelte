<script lang="ts">
	export const prerender = true;

	import Menu from '$lib/components/Menu/Menu.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Toast from '$lib/components/Toast/Toast.svelte';

	import '@fontsource/ibm-plex-sans/latin-400.css';
	import '@fontsource/ibm-plex-sans/latin-500.css';
	import '@fontsource/ibm-plex-sans/latin-600.css';
	import '@fontsource/ibm-plex-serif/latin-700.css';
	import 'normalize.css';
	import '../app.css';

	let isOpen = false;

	function toggleOpen(): void {
		isOpen = !isOpen;
	}

	function hideMenu(): void {
		isOpen = false;
	}
</script>

<div>
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

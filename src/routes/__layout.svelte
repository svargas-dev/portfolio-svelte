<script lang="ts">
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

<main>
  <Menu {isOpen} {toggleOpen} {hideMenu} />
  <!-- TypeScript defs for HTMLDivElement need to be updated for inert tag -->
  <!-- https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert -->
  <div aria-hidden={isOpen} inert={isOpen}>
    <slot />
  </div>
  <Footer />
</main>

<Toast />

<style>
  main {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>

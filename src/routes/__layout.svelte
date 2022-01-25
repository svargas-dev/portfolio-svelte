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
</script>

<main>
  <Menu />
  <slot />
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

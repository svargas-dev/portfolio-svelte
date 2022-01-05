<script lang="ts">
  import '@fontsource/ibm-plex-sans/latin-400.css';
  import '@fontsource/ibm-plex-sans/latin-500.css';
  import '@fontsource/ibm-plex-sans/latin-600.css';
  import '@fontsource/ibm-plex-serif/latin-700.css';
  import Menu from '$lib/Menu/index.svelte';
  import Footer from '$lib/Footer/index.svelte';
  import 'normalize.css';
  import '../app.css';
</script>

<main>
  <Menu />
  <slot />
  <div class="sideline" />
  <Footer />
</main>

<style>
  main {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .sideline {
    position: fixed;
    top: 0;
    left: 0;
    background-color: var(--color-orange);
  }

  /* Mobile + tablet */
  @media (max-width: 1024px) {
    .sideline {
      width: 100%;
      height: 0.5vw;
      max-height: 0.75rem;
    }
  }

  /* Desktop */
  @media (min-width: 1025px) {
    .sideline {
      width: 0.5vw;
      max-width: 0.75rem;
      height: 100%;
    }
  }
</style>

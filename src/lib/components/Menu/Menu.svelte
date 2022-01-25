<script lang="ts">
  import MenuButton from './MenuButton.svelte';
  import { trapFocus } from '$lib/utils/trapFocus';

  let navWrapperEl: HTMLElement;
  export let isOpen = false;
  export let toggleOpen: () => void;
  export let hideMenu: () => void;

  $: navClass = isOpen ? 'nav--open' : '';

  function handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'Escape' || e.keyCode === 27) hideMenu();
  }

  let trapFocusCleanup: () => void;
  $: {
    if (navWrapperEl && isOpen) trapFocusCleanup = trapFocus(navWrapperEl);
    if (!isOpen && trapFocusCleanup) trapFocusCleanup();
  }
</script>

<!-- TypeScript defs for HTMLDivElement need to be updated for inert tag -->
<!-- https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert -->
<aside bind:this={navWrapperEl} on:click={toggleOpen} on:keydown={handleKeydown} inert={!isOpen}>
  <MenuButton {isOpen} />

  <nav class={navClass} aria-hidden={!isOpen}>
    <!-- tabindex required for backwards compatibility -->
    <a href="#about" tabindex={isOpen ? 0 : -1}>About</a>
    <a href="#contact" tabindex={isOpen ? 0 : -1}> Contact</a>
  </nav>
</aside>

<style>
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
    transition: 400ms ease-in-out;
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

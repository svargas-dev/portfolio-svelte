<script lang="ts">
  /**
   * A good candidate for SVG animation instead here
   */
  import { fade } from 'svelte/transition';

  export let isOpen: boolean;

  $: buttonClass = isOpen ? 'menu-button bg-black menu-button--open' : 'menu-button';
  $: buttonTextClass = isOpen ? 'menu-button__text menu-button__text--open' : 'menu-button__text';

  $: menuAtom1 = isOpen ? 'menu-atom menu-cross-1' : 'menu-atom menu-dot menu-dot-1';
  $: menuAtom2 = isOpen ? 'd-none' : 'menu-atom menu-dot menu-dot-2';
  $: menuAtom3 = isOpen ? 'd-none' : 'menu-atom menu-dot menu-dot-3';
  $: menuAtom4 = isOpen ? 'menu-atom menu-cross-2' : 'menu-atom menu-dot menu-dot-4';
</script>

<button class={buttonClass}>
  <div class={buttonTextClass} role="status" aria-live="polite">
    {#if !isOpen}
      <span transition:fade>MENU</span>
    {:else}
      <span class="sr-only" in:fade={{ delay: 400, duration: 1 }} out:fade={{ duration: 1 }}>
        CLOSE
      </span>
    {/if}
  </div>

  <div class="menu-icon" aria-hidden={true}>
    <div class={menuAtom1} />
    <div class={menuAtom2} />
    <div class={menuAtom3} />
    <div class={menuAtom4} />
  </div>
</button>

<style>
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
    color: var(--color-black);
    background-color: transparent;
    transition: outline 100ms;
  }

  .menu-button--open:focus,
  .menu-button--open:active {
    transition: none;
    outline: 2px dashed white;
  }

  .menu-button__text {
    position: absolute;
    transform: translateX(-3.75em);
    transition: transform 300ms;
  }

  .menu-button__text--open {
    transform: translateX(50vw);
  }

  .menu-icon {
    width: 3em;
    height: 3em;
    position: absolute;
    left: 0;
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
    transition: all ease-in 200ms;
    will-change: transform;
  }

  .d-none {
    content-visibility: hidden;
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
  .menu-button:focus .menu-dot,
  .menu-button:hover .menu-dot {
    transform: translate(0, 0);
  }

  .menu-cross-1 {
    border-radius: 0;
    transform: rotate(45deg) scaleX(4);
  }

  .menu-cross-2 {
    border-radius: 0;
    transform: rotate(-45deg) scaleX(4);
  }
</style>

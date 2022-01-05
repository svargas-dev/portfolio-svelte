<script lang="ts">
  export let isOpen: boolean;
  export let toggleOpen: () => void;
  export let handleKeydown: (e: KeyboardEvent) => void;

  $: buttonClass = isOpen ? 'menu-button bg-black' : 'menu-button';
  $: buttonTextClass = isOpen ? 'menu-button__text sr-only' : 'menu-button__text';
  $: buttonText = isOpen ? 'CLOSE' : 'MENU';
  $: menuDot1Class = isOpen ? 'menu-dot menu-dot--close menu-dot-1--close' : 'menu-dot menu-dot-1';
  $: menuDot2Class = isOpen ? 'menu-dot menu-dot--close' : 'menu-dot menu-dot-2';
  $: menuDot3Class = isOpen ? 'menu-dot menu-dot--close' : 'menu-dot menu-dot-3';
  $: menuDot4Class = isOpen ? 'menu-dot menu-dot--close menu-dot-4--close' : 'menu-dot menu-dot-4';
</script>

<button class={buttonClass} on:click={toggleOpen} on:keydown={handleKeydown}>
  <span class={buttonTextClass}>{buttonText}</span>

  <div class="menu-icon" aria-hidden={true}>
    <div class={menuDot1Class} />
    <div class={menuDot2Class} />
    <div class={menuDot3Class} />
    <div class={menuDot4Class} />
  </div>
</button>

<style>
  .menu-button {
    position: fixed;
    z-index: 3;
    top: 1.5em;
    right: 1.5em;
    max-height: 3em;
    display: flex;
    align-items: center;
    border: none;
    font-weight: 600;
    font-family: var(--font-sans);
    color: var(--color-black);
    background-color: transparent;
    transition: all ease-in-out 400ms;
  }

  .menu-button__text {
    transition: all 100ms ease;
  }

  .menu-icon {
    width: 3em;
    height: 3em;
    position: relative;
  }

  .menu-dot {
    width: 0.5em;
    height: 0.5em;
    border-radius: 0.25em;
    background-color: var(--color-green);
    position: absolute;
    margin: auto auto;
    transition: all ease-in 200ms;
  }

  .menu-dot-1 {
    top: 0;
    left: 0.5em;
    bottom: 0;
  }

  .menu-dot-2 {
    top: 0.5em;
    left: 0;
    right: 0;
  }

  .menu-dot-3 {
    bottom: 0.5em;
    left: 0;
    right: 0;
  }

  .menu-dot-4 {
    right: 0.5em;
    top: 0;
    bottom: 0;
  }

  .menu-button:hover .menu-dot,
  .menu-dot--close {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .menu-dot-1--close {
    width: 2.5em;
    transform: rotate(45deg);
  }

  .menu-dot-4--close {
    width: 2.5em;
    transform: rotate(-45deg);
  }
</style>

<script lang="ts">
  import { fly } from 'svelte/transition';
  import MenuButton from './MenuButton/index.svelte';

  let isOpen = false;

  function toggleOpen(): void {
    isOpen = !isOpen;
  }

  function handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'Escape') isOpen = false;
  }
</script>

<MenuButton {isOpen} {toggleOpen} {handleKeydown} />

{#if isOpen}
  <div class="nav-wrapper" on:click={toggleOpen} on:keydown={handleKeydown}>
    <div
      class="nav-container"
      in:fly={{ x: 400, duration: 750 }}
      out:fly={{ x: 400, duration: 500 }}
      on:click|stopPropagation
    >
      <navbar class="open">
        <a href="#about" on:click={toggleOpen}>About</a>
        <a href="#contact" on:click={toggleOpen}> Contact</a>
      </navbar>
    </div>
  </div>
{/if}

<style>
  .nav-wrapper {
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .nav-container {
    position: absolute;
    top: 0;
    right: 0;
    width: clamp(15em, 16.667vw, 500px);
    height: 100%;
    background-color: var(--color-black);
  }

  navbar {
    display: flex;
    flex-direction: column;
    padding: 0 3em;
    position: relative;
    top: 16.667vh;
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
</style>

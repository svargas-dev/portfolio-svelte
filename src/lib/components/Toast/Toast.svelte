<script lang="ts">
  /**
   * A Svelte implementation of Adam Argyle's toast
   * https://github.com/argyleink/gui-challenges/tree/main/toast
   */
  import { toastStore } from '$lib/stores/toastStore';
  import './toast.css';

  let toasts: string[];
  toastStore.subscribe((ts) => (toasts = ts));

  let toasterEl: HTMLElement;

  const createToast = (text: string): HTMLOutputElement => {
    const node = document.createElement('output');

    node.innerText = text;
    node.setAttribute('class', 'toast');
    // set appropriate attributes for screen readers
    node.setAttribute('role', 'status'); // for backwards compatibility
    node.setAttribute('aria-live', 'polite');

    return node;
  };

  const addToast = (toast: HTMLOutputElement): void => {
    if (!toasterEl || typeof window === 'undefined') return;

    const { matches: motionOK } = window.matchMedia('(prefers-reduced-motion: no-preference)');
    toasterEl.children.length && motionOK ? flipToast(toast) : toasterEl.prepend(toast);
  };

  /**
   * I could, of course, have used Svelte animations inside
   * conditional statements but wanted to play with the FLIP concept
   *
   * https://aerotwist.com/blog/flip-your-animations/
   */
  const flipToast = (toast: HTMLOutputElement): void => {
    if (!toasterEl) return;

    // FIRST
    const first = toasterEl.offsetHeight;

    // add new child to change container size
    toasterEl.prepend(toast);

    // LAST
    const last = toasterEl.offsetHeight;

    // INVERT
    const invert = first - last;

    // PLAY
    const animation = toasterEl.animate(
      [{ transform: `translateY(${invert}px)` }, { transform: 'translateY(0)' }],
      {
        duration: 150,
        easing: 'ease-out'
      }
    );

    // ensures animations start immediately on Firefox instead of waiting for next frame
    animation.startTime = document.timeline.currentTime;
  };

  const Toast = (text: string): Promise<void> => {
    if (!toasterEl) return;

    const toast = createToast(text);
    addToast(toast);

    /**
     * So we know when animations are complete and toast has been removed from the DOM
     */
    // eslint-disable-next-line
    return new Promise(async (resolve, _reject) => {
      await Promise.allSettled(toast.getAnimations().map((animation) => animation.finished));
      toasterEl.removeChild(toast);
      resolve();
    });
  };

  $: {
    toasts.forEach((toast) => {
      toastStore.update((toasts) => toasts.filter((t) => t !== toast));
      Toast(toast);
    });
  }
</script>

<section bind:this={toasterEl} class="toast-group" />

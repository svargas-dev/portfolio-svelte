<script lang="ts">
  import { fade } from 'svelte/transition';
  import { encode } from '$lib/utils/encode';

  export const prerender = true;

  let wrapperEl: HTMLDivElement;
  let showLogoEl = false;

  function shouldShowBackToTop(): void {
    if (typeof wrapperEl === 'undefined') return;

    if (Math.round(wrapperEl.scrollTop) >= window.innerHeight) {
      showLogoEl = true;
    } else if (showLogoEl === true) {
      showLogoEl = false;
    }
  }

  function scrollToTop(): void {
    if (typeof wrapperEl === 'undefined') return;

    wrapperEl.scrollTo(0, 0);
  }

  let formData = {};
  enum FormStatus {
    Pending = '',
    Sending = 'Sending ...',
    Sent = 'Form sent',
    Error = 'There was an error sending the form. Please try again'
  }
  let result = FormStatus.Pending;

  /**
   * Svelte's TS defs are still lacking unfortunately
   */
  function handleChange(e: any): void {
    formData = { ...formData, [e.target.name]: e.target.value };
  }

  /**
   * Svelte's TS defs are still lacking unfortunately
   */
  function handleSubmit(event: any): void {
    result = FormStatus.Sending;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': event.target.name, ...formData })
    })
      .then(() => (result = FormStatus.Sent))
      .catch(() => (result = FormStatus.Error));
  }
</script>

<div class="wrapper-bg">
  <div bind:this={wrapperEl} class="wrapper-content" dir="ltr" on:scroll={shouldShowBackToTop}>
    <section id="home">
      <div class="headline">
        <h1>Sam Vargas</h1>
        <h2>Full-stack Engineer</h2>
      </div>
    </section>

    <section id="about">
      <div class="about">
        <h2>About</h2>
        <p>
          A maker and creative problem solver dedicated to creating impactful, accessibile and
          performant solutions. With over 2 years commercial experience in startups, I've
          skyrocketed performace, accessibility and SEO.
        </p>
        <p>
          After nearly a decade working at sea as an officer on board merchant ships, eventually
          specialising in Antarctic oceanographic vessels, I decided it was time for a new
          challenge. From books, video courses and friends I began my learning journey and in 2019
          graduated fron Ironhack Lisbon after an intensive bootcamp focused on today's tech and
          best practices.
        </p>
        <p class="this-site">
          Checkout the <a
            href="https://github.com/svargas-dev"
            target="_blank"
            rel="noopener noreferrer">source</a
          > for this site.
        </p>
      </div>
    </section>

    <section id="contact">
      <div class="contact">
        <h2>Contact</h2>
        <form
          name="contact"
          data-netlify="true"
          netlify-honeypot="bot-field"
          on:submit|preventDefault={handleSubmit}
        >
          <input type="hidden" name="form-name" value="contact" />
          <label for="contact-name">
            Name<br />
            <input
              id="contact-name"
              name="contact-name"
              type="text"
              required
              on:change={handleChange}
            />
          </label>
          <label for="contact-email">
            Email<br />
            <input
              id="contact-email"
              name="contact-email"
              type="email"
              required
              on:change={handleChange}
            />
          </label>
          <label for="contact-message">
            Message<br />
            <textarea
              id="contact-message"
              name="contact-message"
              rows="7"
              maxlength="512"
              required
              on:change={handleChange}
            />
          </label>

          <button
            type="submit"
            disabled={result === FormStatus.Sending || result === FormStatus.Sent}>Send</button
          >
        </form>
        <p class="result">{result}</p>
      </div>
    </section>
  </div>

  {#if showLogoEl}
    <button class="scroll-to-top" on:click={scrollToTop} transition:fade>Back to top </button>
  {/if}
</div>

<style>
  .scroll-to-top {
    width: max-content;
    height: 2em;
    position: fixed;
    z-index: 1;
    background-color: var(--color-white);
    border: none;
    border-bottom: 0.25em solid var(--color-gray);
    transition: all 300ms ease;
  }

  .scroll-to-top:focus {
    filter: invert(1);
  }

  .wrapper-content {
    position: fixed;
    width: 100%;
    height: 100vh;
    overflow: auto;
    /* fade out effect top and bottom. 2nd linear gradient preserves browser scrollbar styling */
    mask-image: linear-gradient(transparent 3%, black 15%, black 85%, transparent 97%),
      linear-gradient(to right, transparent calc(100% - 1rem), black calc(100% - 1rem));
    -webkit-mask-image: linear-gradient(transparent 3%, black 15%, black 85%, transparent 97%),
      linear-gradient(to right, transparent calc(100% - 1rem), black calc(100% - 1rem));
    scroll-snap-type: y mandatory;
    overscroll-behavior: none;
  }

  .wrapper-bg {
    position: fixed;
    width: 100%;
    height: 100vh;
  }

  section {
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(6, 1fr);
    scroll-snap-align: center;
  }

  .headline {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transform: rotateZ(-10deg);
  }

  .headline h1,
  .headline h2 {
    line-height: 1;
    margin: 0;
    border-radius: 0.25em;
  }

  .headline h1 {
    width: max-content;
    border-top: 0.25em solid var(--color-green);
    padding: 0.85rem 0;
  }

  .headline h2 {
    width: 66.666%;
    border-bottom: 0.25em solid var(--color-purple);
    padding: 1rem 0;
  }

  .contact form {
    display: flex;
    flex-direction: column;
  }

  .contact label {
    margin: 0.5em 0;
  }

  .contact form input,
  .contact form textarea {
    width: 100%;
    resize: none;
    margin: 0.25em 0;
  }

  input:focus,
  textarea:focus {
    outline: 2px solid var(--color-orange);
  }

  .contact form button {
    width: max-content;
    padding: 0.25em 0.5em;
    border: none;
    border-radius: 0.125em;
    background-color: var(--color-black);
    color: var(--color-white);
    margin-inline: auto;
    transition: box-shadow 150ms ease-in-out;
  }

  .contact form button:focus {
    outline: 2px solid var(--color-orange);
  }

  .contact form button:hover {
    box-shadow: 0 0 0.25em 0.2em var(--color-gray);
  }

  .contact form button:disabled {
    cursor: not-allowed;
    opacity: 0.666;
    box-shadow: none;
  }

  .about,
  .contact {
    position: relative;
    top: 12.5%;
  }

  .result {
    text-align: center;
  }

  /* Mobile + tablet */
  @media (max-width: 1024px) {
    .scroll-to-top {
      bottom: 5em;
      right: 2em;
    }

    .headline {
      grid-column: 3 / 6;
      grid-row: 3;
    }

    .about,
    .contact {
      grid-column: 2 / 6;
      grid-row: 1 / 4;
      padding: 2em 0;
    }
  }

  /* Mobile - android onscreen keyboard fix */
  @media (max-width: 1024px) and (max-height: 480px) {
    .scroll-to-top {
      display: none;
    }
  }

  /* Mobile */
  @media (max-width: 480px) {
    .wrapper-bg {
      background: fixed left bottom / auto 55vw no-repeat url('/image/sam-vargas-480.webp')
        var(--color-white);
    }
  }

  /* Tablets */
  @media (min-width: 481px) and (max-width: 1024px) {
    .wrapper-bg {
      background: fixed left bottom / auto 55vw no-repeat url('/image/sam-vargas-900.webp')
        var(--color-white);
    }

    .about,
    .contact {
      grid-column: 2 / 6;
      padding: 3em 0;
    }
  }

  /* Desktop */
  @media (min-width: 1025px) {
    .wrapper-bg {
      background: fixed left bottom / auto 100vh no-repeat url('/image/sam-vargas-1200.webp')
        var(--color-white);
    }

    .scroll-to-top {
      bottom: 2em;
      left: 0;
      right: 0;
      margin-inline: auto;
    }

    .headline {
      grid-column: 4 / 6;
      grid-row: 3;
    }

    .about,
    .contact {
      grid-column: 4 / 6;
      grid-row: 2 / 4;
    }
  }
</style>

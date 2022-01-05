import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter({ split: false }),

    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',

    // we don't need this
    router: false
  }
};

export default config;

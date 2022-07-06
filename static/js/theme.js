/*
 * Prevents 'flashing' when loading theme
 */
function prefersColorScheme() {
	if (typeof window != 'undefined') {
		const mediaQueryLight = window.matchMedia('(prefers-color-scheme: light)');
		if (mediaQueryLight.matches) return 'light';

		const mediaQueryDark = window.matchMedia('(prefers-color-scheme: dark)');
		if (mediaQueryDark.matches) return 'dark';
	}

	return undefined;
}

const uaColorScheme = prefersColorScheme();
const lsColorScheme = localStorage.getItem('theme');
const themeToSet = lsColorScheme ?? uaColorScheme;
if (document && themeToSet) {
	// since our Svelte app hasn't rendered yet it has to go outside of the #svelte root
	// SvelteKit sadly recreates the entire body erasing attributes
	// so I'm adding the attribute to the html tag itself
	const html = document.querySelector('html');
	if (html) html.setAttribute('data-theme', themeToSet);
}

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
	// SvelteKit sadly seems to cause a rerender of the entire body erasing attributes
	// so I'm creating a new element as a sibling to the body
	const themeEl = document.createElement('div');
	themeEl.setAttribute('id', 'theme');
	themeEl.setAttribute('data-theme', themeToSet);
	document.childNodes[1].appendChild(themeEl);
}

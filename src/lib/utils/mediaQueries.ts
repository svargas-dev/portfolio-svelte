import type { ThemeType } from '$lib/stores/themeStore';

export const prefersReducedMotion = (): boolean | undefined => {
	if (typeof window != 'undefined') {
		const mediaQuery = window?.matchMedia('(prefers-reduced-motion: reduce)');
		return mediaQuery.matches;
	}

	return undefined;
};

export const prefersColorScheme = (): ThemeType => {
	if (typeof window != 'undefined') {
		const mediaQueryLight = window?.matchMedia('(prefers-color-scheme: light)');
		if (mediaQueryLight.matches) return 'light';

		const mediaQueryDark = window?.matchMedia('(prefers-color-scheme: dark)');
		if (mediaQueryDark.matches) return 'dark';
	}

	return undefined;
};

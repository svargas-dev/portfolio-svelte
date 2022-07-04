export const prefersReducedMotion = (): boolean | undefined => {
	if (typeof window != 'undefined') {
		const mediaQuery = window?.matchMedia('(prefers-reduced-motion: reduce)');
		return mediaQuery.matches;
	}

	return undefined;
};

export function supportsCssProperty(property: string, value: string): boolean | undefined {
	if (typeof window !== 'undefined') {
		return window.CSS.supports(property, value);
	}

	return undefined;
}

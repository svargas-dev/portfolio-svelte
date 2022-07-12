/**
 * A stateless keyboard utility to trap focus for a11y
 *
 * Quick modernization of
 * https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element
 * https://medium.com/@im_rahul/focus-trapping-looping-b3ee658e5177
 *
 * @remarks on a larger producation app you may want to optionally record
 * the focused element before opening e.g. for use with a modal
 * then restore when closing
 */
export function trapFocus(element: HTMLElement, close?: () => void): (() => void) | undefined {
	if (typeof document === 'undefined') return undefined;

	const focusableEls = element.querySelectorAll(
		'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
	);
	const focusableList: HTMLElement[] = [];
	focusableEls.forEach((element) => focusableList.push(element as HTMLElement));

	function loopFocus(e: KeyboardEvent) {
		if (!document.activeElement) return;

		if (e.key === 'Escape' && close) {
			close();
			return;
		}

		const index = focusableList.indexOf(document.activeElement as HTMLElement);
		let nextIndex = 0;

		const getNextIndexBack = (index: number): number =>
			index > 0 ? index - 1 : focusableList.length - 1;
		const getNextIndexForward = (index: number): number =>
			index + 1 < focusableList.length ? index + 1 : 0;

		if ((e.key === 'Tab' && e.shiftKey) || e.key === 'ArrowUp') {
			e.preventDefault();
			const nextIndex = getNextIndexBack(index);
			if (focusableList[nextIndex].tabIndex < 0) {
				focusableList[getNextIndexBack(nextIndex)].focus();
				return;
			}

			focusableList[nextIndex].focus();
		} else if (e.key === 'Tab' || e.key === 'ArrowDown') {
			e.preventDefault();
			nextIndex = getNextIndexForward(index);
			if (focusableList[nextIndex].tabIndex < 0) {
				focusableList[getNextIndexForward(nextIndex)].focus();
				return;
			}
			focusableList[nextIndex].focus();
		}
	}

	element.addEventListener('keydown', loopFocus);

	return function cleanup() {
		element.removeEventListener('keydown', loopFocus);
	};
}

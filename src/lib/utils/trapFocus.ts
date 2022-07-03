/**
 * A stateless keyboard utility to -
 * - Trap focus for A11y
 *
 * Quick modernization of
 * https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element
 * https://medium.com/@im_rahul/focus-trapping-looping-b3ee658e5177
 *
 * @remarks on a larger producation app you may want to optionally record
 * the focused element before opening e.g. for use with a modal
 * then restore when closing
 */
export function trapFocus(element: HTMLElement): (() => void) | undefined {
	if (typeof document === 'undefined') return undefined;

	const focusableEls = element.querySelectorAll(
		'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
	);
	const firstFocusableEl = focusableEls[0] as FocusableElement;
	const lastFocusableEl = focusableEls[focusableEls.length - 1] as FocusableElement;

	function loopFocus(e: KeyboardEvent) {
		const isTabPressed = e.key === 'Tab';

		if (!isTabPressed) {
			return;
		}

		if (e.shiftKey) {
			/* shift + tab */ if (document.activeElement === firstFocusableEl) {
				lastFocusableEl.focus();
				e.preventDefault();
			}
		} /* tab */ else {
			if (document.activeElement === lastFocusableEl) {
				firstFocusableEl.focus();
				e.preventDefault();
			}
		}
	}

	element.addEventListener('keydown', loopFocus);

	return function cleanup() {
		element.removeEventListener('keydown', loopFocus);
	};
}

type FocusableElement = Element & { focus: () => void };

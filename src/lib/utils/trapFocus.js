/**
 * Quick modernization of
 * https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element
 */
export function trapFocus(element) {
  const focusableEls = element.querySelectorAll(
    'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
  );
  const firstFocusableEl = focusableEls[0];
  const lastFocusableEl = focusableEls[focusableEls.length - 1];
  console.log({ focusableEls, firstFocusableEl, lastFocusableEl });

  const KEYCODE_TAB = 9;
  const KEYCODE_ESC = 27;

  function loopFocus(e) {
    const isTabPressed = e.key === 'Tab' || e.keyCode === KEYCODE_TAB;

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

  // TODO needs unmounting on click too...
  function cleanup(e) {
    const isEscPressed = e.key === 'Escape' || e.keyCode === KEYCODE_ESC;

    if (!isEscPressed) {
      return;
    }

    element.removeEventListener('keydown', loopFocus);
    element.removeEventListener('keydown', cleanup);
  }

  element.addEventListener('keydown', loopFocus);
  element.addEventListener('keydown', cleanup);
}

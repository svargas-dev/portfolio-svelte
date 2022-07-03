// This code takes inspiration from MDN Docs
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
// Albeit heavily modified (weirdly, the code was of poor quality)
// Not that this is my finist
// -- I've also used similar code in this codepen
// https://codepen.io/shdvargas/pen/XWEbxwj

export function observeIntersection(
	observedElement: Element,
	handleIntersectionEvent: IntersectionObserverCallback,
	options?: IntersectionObserverInit
): void {
	createObserver(observedElement, handleIntersectionEvent, options);
}

function createObserver(
	observedElement: Element,
	handleIntersect: IntersectionObserverCallback,
	options?: IntersectionObserverInit
) {
	const observer = new IntersectionObserver(handleIntersect, options);
	observer.observe(observedElement);
}

export function buildThresholdList(numSteps: number): Array<number> {
	const thresholds = [];

	for (let i = 1.0; i <= numSteps; i++) {
		const ratio = i / numSteps;
		thresholds.push(ratio);
	}

	thresholds.push(0);
	return thresholds;
}

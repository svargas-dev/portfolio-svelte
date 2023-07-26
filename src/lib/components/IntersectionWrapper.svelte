<script lang="ts">
	export let src: string;
	export let load: () => void;

	let observedEl: HTMLDivElement;
	let observer: IntersectionObserver;

	// Observe element
	$: {
		if (observedEl && !observer) {
			observer = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						loadScript();
					}
				});
			});

			observer.observe(observedEl);
		}
	}

	const loadScript = () => {
		const script = document.createElement('script');
		script.src = src;
		document.body.appendChild(script);
		observer.disconnect(); // Disconnect the observer after loading the script

		load();
	};
</script>

<div bind:this={observedEl}>
	<slot />
</div>

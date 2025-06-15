<script lang="ts">
	import '../app.css';
	import { onNavigate } from '$app/navigation';
	import ViewportError from '$lib/components/viewportError.svelte';

	let { children } = $props();

	// TODO make view transitions work
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<div class="sm:hidden">
	{@render children()}
</div>
<div class="hidden sm:block">
	<ViewportError />
</div>

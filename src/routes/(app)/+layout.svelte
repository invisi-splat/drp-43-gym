<script lang="ts">
	import Navbar from './navbar.svelte';

	let { children } = $props();
</script>

{@render children()}

<Navbar/>
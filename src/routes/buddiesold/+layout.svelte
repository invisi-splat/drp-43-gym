<script lang="ts">
	let { children } = $props();
	import Navbar from './navbar.svelte';
</script>

<div class="w-full h-lvh flex flex-col items-center py-3 px-2 overflow-y-scroll">
	{@render children()}
</div>

<Navbar></Navbar>

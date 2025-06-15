<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Navbar from './navbar.svelte';

	let { children } = $props();

	onMount(() => {
		// Redirect to login if user_id is not set in sessionStorage
		const user_id = sessionStorage.getItem('user_id');

		if (user_id === null) {
			goto('/login');
		}
	});
</script>

{@render children()}

<Navbar />

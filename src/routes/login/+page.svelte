<script lang="ts">
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase';
	import { Input, type InputValue } from 'flowbite-svelte';

	let userId: number | undefined = $state(undefined);

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		if (userId) {
			const { data, error } = await supabase.from('users').select('id').eq('id', userId).single();
			if (data === null || error) {
				alert('User ID not found');
				return;
			}
			sessionStorage.setItem('user_id', userId.toString());
			goto('/');
		} else {
			alert('Please enter a valid User ID');
		}
	};
</script>

<div class="w-full h-lvh flex flex-col justify-center items-center p-4 space-y-4">
	<h1 class="text-3xl font-bold">Login (dev)</h1>
	<form onsubmit={handleSubmit}>
		<Input type="number" bind:value={userId} placeholder="User ID" required />
	</form>
</div>

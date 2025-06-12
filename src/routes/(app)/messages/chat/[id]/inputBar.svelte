<script lang="ts">
	import { Input } from 'flowbite-svelte';

	let inputText = $state('');

	const submitHandler = (e: SubmitEvent) => {
		inputText = '';
		e.preventDefault();
	};
</script>

<form
	class="w-full absolute h-16 backdrop-blur-lg bottom-15 flex justify-center items-center py-4 gap-x-5"
	onsubmit={submitHandler}
>
	<Input class="max-w-[90%]" placeholder="Message..." bind:value={inputText} />
</form>

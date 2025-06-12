<script lang="ts">
	import { Input } from 'flowbite-svelte';

	interface Props {
		submitCallback: (text: string) => void;
	}

	let inputText = $state('');

	const submitHandler = (e: SubmitEvent) => {
		e.preventDefault();

		submitCallback(inputText);
		inputText = '';
	};

	let { submitCallback }: Props = $props();
</script>

<form
	class="w-full absolute h-16 backdrop-blur-lg bottom-15 flex justify-center items-center py-4 gap-x-5"
	onsubmit={submitHandler}
>
	<Input class="max-w-[90%]" placeholder="Message..." bind:value={inputText} />
</form>

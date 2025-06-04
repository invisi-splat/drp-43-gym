<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { FloatingLabelInput, Textarea, Datepicker } from 'flowbite-svelte';

	import { gymNames, workoutRegimens } from '$lib/placeholderData';

	let { submitCallback } = $props();

	const handleSubmit = () => {
		// data validation stuff...
		submitCallback();
	};
</script>

<!-- unused, but might come in useful for designing own UI components later -->
{#snippet subtitle(text: string)}
	<h2 class="font-bold text-lg">{text}</h2>
{/snippet}

<div
	transition:fade={{ duration: 150 }}
	class="absolute top-0 left-0 h-dvh w-dvw z-20 backdrop-blur-md flex justify-center items-center"
>
	<div
		transition:scale={{ delay: 50 }}
		class="w-[80%] bg-white p-4 space-y-5 rounded-2xl shadow-2xl/50"
	>
		<h1 class="font-bold text-2xl">Schedule a workout!</h1>
		<hr class="text-gray-200" />
		<form class="space-y-1" onsubmit={handleSubmit}>
			<FloatingLabelInput
				variant="outlined"
				type="text"
				data={gymNames}
				class="mb-3"
				required
				clearable>Gym</FloatingLabelInput
			>
			<datalist id="gymsFound">
				{#each gymNames as gymName}
					<option value={gymName}>{gymName}</option>
				{/each}
			</datalist>

			<div class="grid grid-cols-[60%_auto] gap-x-3">
				<Datepicker value={new Date()} class="col-span-1" required />
				<FloatingLabelInput class="col-span-1" variant="outlined" type="time" required
					>Time</FloatingLabelInput
				>
			</div>

			<FloatingLabelInput
				variant="outlined"
				type="text"
				data={workoutRegimens}
				class="mb-3"
				required
				clearable>Workout regimen</FloatingLabelInput
			>
			<Textarea placeholder="Description" class="mb-3" clearable>Description</Textarea>

			<div class="w-full flex justify-center items-center">
				<input
					type="submit"
					value="Share!"
					class="bg-blue-100 p-3 rounded-xl border-blue-200 border-2 font-bold active:bg-blue-200"
				/>
			</div>
		</form>
	</div>
</div>

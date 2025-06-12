<script lang="ts">
	import X from 'virtual:icons/tabler/x';
	import { fade, scale } from 'svelte/transition';
	import { FloatingLabelInput, Textarea, Datepicker } from 'flowbite-svelte';

	let { dismissCallback, submitCallback, gyms, regimens } = $props();

	// svelte-ignore non_reactive_update
	let selectedGym = '';
	let workoutDate = new Date();
	// svelte-ignore non_reactive_update
	let workoutTime = '';
	// svelte-ignore non_reactive_update
	let selectedRegimen = '';
	// svelte-ignore non_reactive_update
	let description = '';

	const handleSubmit = (e: SubmitEvent) => {
		// data validation stuff...
		e.preventDefault();

		//build dateTime from date + time string
		const [hours, minutes] = workoutTime.split(':').map(Number);
		const dateTime = new Date(workoutDate);
		dateTime.setHours(hours, minutes);

		console.log(gyms, regimens);

		if (!gyms.includes(selectedGym)) {
			alert('Please select a valid gym.');
			return;
		}

		if (!regimens.includes(selectedRegimen)) {
			alert('Please select a valid workout regimen.');
			return;
		}

		submitCallback({
			location: selectedGym,
			dateTime: dateTime.toISOString(),
			regimen: selectedRegimen,
			desc: description,
			isFriend: false,
			name: 'Me', // placeholder user profile
			age: 25, // placeholder user profile
			skill: 'novice' // placeholder user profile
		});
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
		class="w-[80%] bg-white p-4 space-y-5 rounded-2xl shadow-2xl/50 relative"
	>
		<h1 class="font-bold text-xl">Schedule a workout!</h1>
		<hr class="text-gray-200" />
		<form class="space-y-1" onsubmit={handleSubmit}>
			<FloatingLabelInput
				bind:value={selectedGym}
				variant="outlined"
				type="text"
				data={gyms}
				class="mb-3"
				required
				clearable>Gym</FloatingLabelInput
			>

			<div class="grid grid-cols-[60%_auto] gap-x-3">
				<Datepicker value={workoutDate} class="col-span-1" required />
				<FloatingLabelInput
					bind:value={workoutTime}
					class="col-span-1"
					variant="outlined"
					type="time"
					required>Time</FloatingLabelInput
				>
			</div>

			<FloatingLabelInput
				bind:value={selectedRegimen}
				variant="outlined"
				type="text"
				data={regimens}
				class="mb-3"
				required
				clearable>Workout regimen</FloatingLabelInput
			>
			<Textarea bind:value={description} placeholder="Description" class="mb-3" clearable
				>Description</Textarea
			>

			<div class="w-full flex justify-center items-center">
				<input
					type="submit"
					value="Share!"
					class="bg-blue-100 p-3 rounded-xl border-blue-200 border-2 font-bold active:bg-blue-200"
				/>
			</div>
		</form>
		<button
			class="absolute right-3 top-3 bg-gray-100 p-1 rounded-lg active:bg-gray-200 transition-all"
			onclick={dismissCallback}><X class="text-xl" /></button
		>
	</div>
</div>

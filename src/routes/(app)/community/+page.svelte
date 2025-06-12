<script lang="ts">
	import Workout from './workout.svelte';
	import FloatingPlus from './floatingPlus.svelte';
	import WorkoutCreator from './workoutCreator.svelte';
	import NavbarCompensation from '$lib/components/navbarCompensation.svelte';
	import Header from '$lib/components/header.svelte';
	import FilterBar from './filterBar.svelte';

	import { Input } from 'flowbite-svelte';
	import { supabase } from '$lib/supabase';
	import { invalidate } from '$app/navigation';
	import { page } from '$app/state';

	import { gymNames } from '$lib/placeholderData';
	import { workouts } from '$lib/stores/workout';
	import { derived } from 'svelte/store';

	const { data } = $props<{ data: { workouts: WorkoutComponent[] } }>();
	workouts.set(data.workouts);

	let workoutCreationFormVisible = $state(false);
	let gymFilterName = $state('');
	let selectedRegimen: string | null = $state(null);

	const showWorkoutCreator = () => {
		workoutCreationFormVisible = true;
	};

	const workoutCreatorDismissHandler = () => {
		workoutCreationFormVisible = false;
	};

	// FIXME this is a slight hack; ideally, our front-end component props and our
	// back-end DB schemata should not share the same type (we should have an interface
	// somewhere that converts between the two). Here we are directly using the front-end
	// type as the type for the back-end schema.
	const workoutCreatorSubmitHandler = async (newWorkoutData: WorkoutComponent) => {
		console.log('Submitting new workout:', newWorkoutData);

		// XXX currently broken!
		// Insert to Supabase
		const { data, error } = await supabase
			.from('workouts')
			.insert([newWorkoutData])
			.select()
			.single();

		if (error) {
			console.error('Error inserting workout:', error);
			return;
		}

		console.log('Workout inserted successfully!');

		// update the workouts store reactively
		await invalidate(page.url.pathname);
		workouts.update((current) => [...current, data]);
		workoutCreationFormVisible = false;
	};

	// helper: get start of today, this week, this month
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const endOfToday = new Date();
	endOfToday.setHours(23, 59, 59, 999);
	const weekFromToday = new Date();
	weekFromToday.setDate(today.getDate() + 7);
	const monthFromToday = new Date(today.getMonth() + 1);

	// group workouts
	const groupedWorkouts = derived(workouts, ($workouts) => {
		const groups: Record<string, WorkoutComponent[]> = {
			Today: [],
			'This Week': [],
			'This Month': [],
			Later: []
		};

		for (const workout of $workouts) {
			const workoutDate = new Date(workout.dateTime);

			if (workoutDate >= today && workoutDate < endOfToday) {
				groups['Today'].push(workout);
			} else if (workoutDate >= endOfToday && workoutDate < weekFromToday) {
				groups['This Week'].push(workout);
			} else if (workoutDate >= weekFromToday && workoutDate < monthFromToday) {
				groups['This Month'].push(workout);
			} else {
				groups['Later'].push(workout);
			}
		}
		return groups;
	});
</script>

{#snippet filter()}
	<Input
		placeholder="Filter by gym..."
		type="text"
		data={gymNames}
		class="text-base font-normal"
		clearable
		bind:value={gymFilterName}
	></Input>
{/snippet}

<div class="h-dvh w-full overflow-y-scroll bg-gray-100">
	<Header mainText="Workouts" rightSnippet={filter} />
	<FilterBar bind:selectedRegimen regimens={data.regimens} />
	{#each Object.entries($groupedWorkouts) as [groupName, workouts]}
		{#if workouts.length > 0}
			<h2 class="p-4 font-bold text-xl">{groupName}</h2>
			<div class="space-y-4">
				{#each workouts as workout}
					{#if (workout.location
						.toLowerCase()
						.startsWith(gymFilterName.toLowerCase()) || gymFilterName === '') && (selectedRegimen === null || workout.regimen === selectedRegimen)}
						<Workout {...workout}></Workout>
					{/if}
				{/each}
			</div>
		{/if}
	{/each}
	<!-- navbar compensation -->
	<NavbarCompensation size="h-28" />
</div>

{#if workoutCreationFormVisible}
	<WorkoutCreator
		dismissCallback={workoutCreatorDismissHandler}
		submitCallback={workoutCreatorSubmitHandler}
		gyms={data.gyms}
		regimens={data.regimens}
	/>
{/if}

<FloatingPlus {showWorkoutCreator} />

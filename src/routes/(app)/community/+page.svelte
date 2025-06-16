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
	import { bytes } from 'drizzle-orm/gel-core';
	import { getWorkouts, setWorkouts } from '$lib/stores/workout.svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	const { data } = $props<{ data: { workouts: WorkoutComponent[] } }>();

	const workouts = getWorkouts();

	let workoutCreationFormVisible = $state(false);
	let gymFilterName = $state('');
	let selectedRegimen: string | null = $state(null);
	let currentUserId: number | null = $state(null);
	let showLoading = $state(true);

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

		// Get regimen ID from regimen name
		const getRegimenId = async (): Promise<number> => {
			const { data, error } = await supabase
				.from('regimens')
				.select('id')
				.eq('name', newWorkoutData.regimen)
				.single();

			if (error) {
				throw new Error('Error fetching regimen ID:', error);
			}
			return data.id;
		};

		const getGymId = async (): Promise<number> => {
			const { data, error } = await supabase
				.from('gyms')
				.select('id')
				.eq('name', newWorkoutData.location)
				.single();

			if (error) {
				throw new Error('Error fetching gym ID:', error);
			}
			return data.id;
		};

		const { data, error } = await supabase
			.from('workouts')
			.insert({
				isFriend: false, // assuming this is always false for now
				desc: newWorkoutData.desc,
				dateTime: newWorkoutData.dateTime,
				user_id: newWorkoutData.user_id,
				regimen_id: await getRegimenId(),
				gym: await getGymId()
			})
			.select()
			.single();

		if (error) {
			console.error('Error inserting workout:', error);
			return;
		}

		console.log('Workout inserted successfully!');

		// update the workouts store reactively
		await invalidate(page.url.pathname);
		setWorkouts([...getWorkouts(), newWorkoutData]);
		workoutCreationFormVisible = false;
	};

	// helper: get start of today, this week, this month
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const endOfToday = new Date();
	endOfToday.setHours(23, 59, 59, 999);
	const weekFromToday = new Date();
	weekFromToday.setDate(today.getDate() + 7);
	const monthFromToday = new Date();
	monthFromToday.setMonth(today.getMonth() + 1);

	// group workouts
	const groupedWorkouts = $derived.by(() => {
		const groups: Record<string, WorkoutComponent[]> = {
			'My workouts': [],
			Today: [],
			'This Week': [],
			'This Month': [],
			Later: []
		};

		if (!currentUserId) {
			return groups; // return nothing while component is mounting
		}

		for (const workout of getWorkouts()) {
			const workoutDate = new Date(workout.dateTime);

			if (workout.user_id === Number(currentUserId)) {
				groups['My workouts'].push(workout);
			} else if (workoutDate >= today && workoutDate < endOfToday) {
				groups['Today'].push(workout);
			} else if (workoutDate >= endOfToday && workoutDate < weekFromToday) {
				groups['This Week'].push(workout);
			} else if (workoutDate >= weekFromToday && workoutDate < monthFromToday) {
				groups['This Month'].push(workout);
			} else if (workoutDate >= monthFromToday) {
				groups['Later'].push(workout);
			}
		}
		return groups;
	});

	onMount(() => {
		showLoading = false;
		currentUserId = Number(sessionStorage.getItem('user_id'));
	});
</script>

{#snippet filter()}
	<Input
		placeholder="Filter by gym..."
		type="text"
		data={data.gyms}
		class="text-base font-normal"
		clearable
		bind:value={gymFilterName}
	></Input>
{/snippet}

<div class="h-dvh w-full overflow-y-scroll bg-gray-100">
	<Header mainText="Workouts" rightSnippet={filter} />
	<FilterBar bind:selectedRegimen regimens={data.regimens} />
	{#if showLoading}
		<div out:fly={{ y: -20, duration: 300 }} class="p-4 w-full flex justify-center items-center">
			<p class="text-gray-500">Loading...</p>
		</div>
	{/if}
	{#each Object.entries(groupedWorkouts) as [groupName, workouts]}
		{#if workouts.length > 0}
			<h2 in:fly={{ y: 20, delay: 300 }} class="p-4 font-bold text-xl">{groupName}</h2>
			<div in:fly={{ y: 20, delay: 300 }} class="space-y-4">
				{#each workouts as workout}
					{#if (workout.location
						.toLowerCase()
						.startsWith(gymFilterName.toLowerCase()) || gymFilterName === '') && (selectedRegimen === null || workout.regimen === selectedRegimen)}
						{#if groupName === 'My workouts'}
							<Workout {...workout} selfWorkout={true}></Workout>
						{:else}
							<Workout {...workout} selfWorkout={false}></Workout>
						{/if}
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

<script lang="ts">
	import Workout from './workout.svelte';
	import FloatingPlus from './floatingPlus.svelte';
	import WorkoutCreator from './workoutCreator.svelte';
	import NavbarCompensation from '$lib/components/navbarCompensation.svelte';
	import { datetime } from 'drizzle-orm/mysql-core';

	const { data } = $props<{ data: { workouts: WorkoutComponent[] } }>();

	let workoutCreationFormVisible = $state(false);

	const showWorkoutCreator = () => {
		workoutCreationFormVisible = true;
	};

	const workoutCreatorDismissHandler = () => {
		workoutCreationFormVisible = false;
	};

	const workoutCreatorSubmitHandler = () => {
		// FIXME placeholder; actually do some stuff
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
	const groupedWorkouts: Record<string, WorkoutComponent[]> = {
		Today: [],
		'This Week': [],
		'This Month': [],
		Later: []
	};

	for (const workout of data.workouts) {
		const workoutDate = new Date(workout.dateTime);

		if (workoutDate >= today && workoutDate < endOfToday) {
			groupedWorkouts['Today'].push(workout);
		} else if (workoutDate >= endOfToday && workoutDate < weekFromToday) {
			groupedWorkouts['This Week'].push(workout);
		} else if (workoutDate >= weekFromToday && workoutDate < monthFromToday) {
			groupedWorkouts['This Month'].push(workout);
		} else {
			groupedWorkouts['Later'].push(workout);
		}
	}
</script>

<div class="h-dvh w-full overflow-y-scroll bg-gray-100">
	<h1 class="p-4 font-bold text-2xl">Workouts</h1>
	{#each Object.entries(groupedWorkouts) as [groupName, workouts]}
		{#if workouts.length > 0}
			<h2 class="p-4 font-bold text-xl">{groupName}</h2>
			<div class="space-y-4">
				{#each workouts as workout}
					<Workout {...workout}></Workout>
				{/each}
			</div>
		{/if}
	{/each}
	<!-- navbar compensation -->
	<NavbarCompensation />
</div>

{#if workoutCreationFormVisible}
	<WorkoutCreator
		dismissCallback={workoutCreatorDismissHandler}
		submitCallback={workoutCreatorSubmitHandler}
	/>
{/if}

<FloatingPlus {showWorkoutCreator} />

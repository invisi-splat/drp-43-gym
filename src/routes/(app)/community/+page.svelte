<script lang="ts">
	import Workout from './workout.svelte';
	import { testWorkoutComponents } from '$lib/placeholderData';
	import FloatingPlus from './floatingPlus.svelte';
	import WorkoutCreator from './workoutCreator.svelte';

	let workoutCreationFormVisible = $state(false);

	const showWorkoutCreator = () => {
		workoutCreationFormVisible = true;
	};

	const workoutCreatorSubmitHandler = () => {
		workoutCreationFormVisible = false;
	};
</script>

<div class="h-dvh w-full overflow-y-scroll bg-gray-100">
	<h1 class="p-4 font-bold text-2xl">Your workouts</h1>
	<h1 class="p-4 font-bold text-2xl">Today</h1>
	<div class="space-y-4">
		{#each testWorkoutComponents as workout}
			<Workout {...workout}></Workout>
		{/each}
	</div>
	<!-- navbar compensation -->
	<div class="h-15"></div>
</div>

{#if workoutCreationFormVisible}
	<WorkoutCreator submitCallback={workoutCreatorSubmitHandler} />
{/if}

<FloatingPlus {showWorkoutCreator} />

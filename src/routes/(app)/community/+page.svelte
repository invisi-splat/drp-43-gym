
<script lang="ts">
	import Workout from './workout.svelte';
	import FloatingPlus from './floatingPlus.svelte';
	import WorkoutCreator from './workoutCreator.svelte';
	import NavbarCompensation from '$lib/components/navbarCompensation.svelte';

	const { data } = $props<{ data: { workouts: WorkoutComponent[]}}>();

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
</script>

<div class="h-dvh w-full overflow-y-scroll bg-gray-100">
	<h1 class="p-4 font-bold text-2xl">Your workouts</h1>
	<div class="space-y-4">
		{#each data.workouts as workout}
			<Workout {...workout}></Workout>
		{/each}
	</div>
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

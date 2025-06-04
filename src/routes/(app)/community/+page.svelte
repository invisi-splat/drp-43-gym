<script lang="ts">
	import Workout from './workout.svelte';
	import { testWorkoutComponents } from '$lib/placeholderData';
	import FloatingPlus from './floatingPlus.svelte';
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

<FloatingPlus />

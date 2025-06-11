<script lang="ts">
	let exercise: ExerciseComponent = $props();
	import { marked } from 'marked';
	import { fade } from 'svelte/transition';

	let collapsed = $state(true);
</script>

<button
	class="block w-full text-left bg-white p-4 rounded-lg shadow-md mb-4 active:bg-gray-200 transition-all"
	onclick={() => (collapsed = !collapsed)}
	aria-expanded={!collapsed}
	aria-controls="exercise-details"
	aria-label="Toggle exercise details"
>
	<h3 class="text-lg font-semibold">{exercise.name}</h3>
	{#if !collapsed}
		<p in:fade class="text-gray-800">{@html marked.parse(exercise.description!)}</p>
	{/if}
</button>

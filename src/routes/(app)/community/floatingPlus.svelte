<script lang="ts">
	import Plus from 'virtual:icons/tabler/plus';

	let { showWorkoutCreator }: { showWorkoutCreator: () => void } = $props();
</script>

<div class="absolute bottom-20 w-full flex justify-center pointer-events-none">
	<button
		class="bg-cyan-400 active:bg-cyan-500 rounded-2xl px-6 py-2 shadow-md/30 active:shadow-sm/75 pointer-events-auto"
		onclick={showWorkoutCreator}
	>
		<Plus class="text-3xl" />
	</button>
</div>

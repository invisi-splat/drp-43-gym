<script lang="ts">
	interface Props {
		selectedRegimen: string | null;
		regimens: string[];
	}

	let { selectedRegimen = $bindable(), regimens }: Props = $props();
</script>

{#snippet button(regimen: string | null)}
	<button
		onclick={() => {
			selectedRegimen = regimen;
		}}
		class="px-3 py-1 text-lg rounded-md {regimen === null ? 'italic' : ''} {selectedRegimen ===
		regimen
			? 'bg-blue-300 font-bold'
			: 'bg-gray-100'} active:bg-gray-300 transition-all"
	>
		{regimen === null ? 'All' : regimen}
	</button>
{/snippet}

<div
	class="z-20 top-16 sticky flex gap-x-2 p-2 items-center justify-center bg-gray-300 shadow-sm shadow-black/50
  "
>
	{@render button(null)}
	{#each regimens as regimen}
		{@render button(regimen)}
	{/each}
</div>

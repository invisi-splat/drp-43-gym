<script lang="ts">
	import ArrowBackUp from 'virtual:icons/tabler/arrow-back-up';

	interface HeaderProps {
		returnButton?: boolean;
		mainText: string;
	}

	let { returnButton = false, mainText }: HeaderProps = $props();
</script>

<h1
	class="top-0 py-2 px-4 font-bold text-2xl mb-4 bg-gray-200 h-auto sticky shadow-sm/50 flex items-center gap-x-4"
>
	{#if returnButton}
		<a href="/messages/" aria-label="Back" class="p-2 active:bg-gray-300">
			<ArrowBackUp />
		</a>
	{/if}
	<p class="py-2">{mainText}</p>
</h1>

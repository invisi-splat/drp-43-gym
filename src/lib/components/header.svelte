<script lang="ts">
	import type { Snippet } from 'svelte';

	interface HeaderProps {
		mainText: string;
		leftSnippet?: Snippet;
		rightSnippet?: Snippet;
	}

	let { mainText, leftSnippet, rightSnippet }: HeaderProps = $props();
</script>

<h1
	class="z-50 top-0 py-2 px-4 font-bold text-2xl mb-4 bg-gray-200 h-auto sticky shadow-sm/50 flex items-center gap-x-4"
>
	{@render leftSnippet?.()}
	<p class="py-2">{mainText}</p>
	{@render rightSnippet?.()}
</h1>

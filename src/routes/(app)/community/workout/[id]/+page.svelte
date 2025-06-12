<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import Send from 'virtual:icons/tabler/send';
	import ArrowBackUp from 'virtual:icons/tabler/arrow-back-up';
	import type { PageProps } from './$types';
	import dayjs from 'dayjs';
	import NavbarCompensation from '$lib/components/navbarCompensation.svelte';
	import Exercise from './exercise.svelte';
	import { marked } from 'marked';

	let { data }: PageProps = $props();
</script>

{#snippet returnButton()}
	<a href="/community/" aria-label="Back" class="p-2 active:bg-gray-300">
		<ArrowBackUp />
	</a>
{/snippet}

<div class="h-dvh w-full overflow-y-scroll bg-gray-100">
	<Header
		leftSnippet={returnButton}
		mainText={dayjs(data.workout.dateTime!).format('ddd DD/MM, h:mma')}
	/>
	<div class="px-4 py-2 space-y-4">
		<p class="text-xl">
			{data.workout.name!} wants to train <span class="font-bold">{data.workout.regimen!}</span> at {data
				.workout.location!}.
		</p>
		<p class="py-2 px-3 border-l-4 border-gray-400">
			{data.workout.desc!}
		</p>
		<div class="flex w-full justify-center gap-x-2">
			<a href="/messages/chat" class="bg-gray-200 active:bg-gray-400 p-2 rounded-xl">
				<span class="pr-2">Message</span><Send class="inline-block" />
			</a>
		</div>
		<hr class="border-0 bg-gray-400 h-0.5 my-6" />
		<h1 class="text-xl font-bold">What to know</h1>
		<p class="text-lg p-2 bg-gray-200 rounded-lg">
			{@html marked.parse(data.workout.regimenDesc!)}
		</p>

		<h2 class="text-xl font-bold">Exercise routine suggestions</h2>

		{#each data.exercises as exercise}
			<Exercise {...exercise} />
		{/each}
	</div>
	<NavbarCompensation />
</div>

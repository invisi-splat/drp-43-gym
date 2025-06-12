<script lang="ts">
	import NavbarCompensation from '$lib/components/navbarCompensation.svelte';
	import Header from '$lib/components/header.svelte';
	import InputBar from './inputBar.svelte';
	import Message from './message.svelte';
	import ArrowBackUp from 'virtual:icons/tabler/arrow-back-up';
	import type { PageProps } from './$types';

	const longMessage = 'hello how are you doing';

	let { data }: PageProps = $props();
	let messages = $state([
		{ text: longMessage, selfSent: true },
		{ text: 'great', selfSent: false },
		{ text: 'do you want to go gym???', selfSent: false },
		{ text: "yeah bro!!! let's go gym!!! yeah gym!!!", selfSent: true }
	]);

	const inputBarSubmitCallback = (text: string) => {
		messages.push({ text, selfSent: true });
	};
</script>

{#snippet returnButton()}
	<a href="/messages/" aria-label="Back" class="p-2 active:bg-gray-300">
		<ArrowBackUp />
	</a>
{/snippet}

<div class="h-dvh w-full overflow-y-scroll bg-gray-100 relative pb-4">
	<Header leftSnippet={returnButton} mainText="{data.userProps.name}, {data.userProps.age}" />
	<div class="space-y-5">
		{#each messages as message}
			<Message text={message.text} selfSent={message.selfSent} />
		{/each}
	</div>
	<NavbarCompensation size="h-32" />
</div>

<InputBar submitCallback={inputBarSubmitCallback} />

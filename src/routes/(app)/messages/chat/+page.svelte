<script>
	import NavbarCompensation from '$lib/components/navbarCompensation.svelte';
	import Header from '$lib/components/header.svelte';
	import InputBar from './inputBar.svelte';
	import Message from './message.svelte';
	import ArrowBackUp from 'virtual:icons/tabler/arrow-back-up';

	const longMessage = 'hello how are you doing';
</script>

{#snippet returnButton()}
	<a href="/messages/" aria-label="Back" class="p-2 active:bg-gray-300">
		<ArrowBackUp />
	</a>
{/snippet}

<div class="h-dvh w-full overflow-y-scroll bg-gray-100 relative pb-4">
	<Header leftSnippet={returnButton} mainText="Epic chat" />
	<div class="space-y-5">
		<Message text={longMessage} selfSent />
		<Message text="great" />
		<Message text="do you want to go gym???" />
		<Message text="yeah bro!!! let's go gym!!! yeah gym!!!" selfSent />
	</div>
	<NavbarCompensation size="h-32" />
</div>

<InputBar />

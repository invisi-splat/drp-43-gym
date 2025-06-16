<script lang="ts">
	import NavbarCompensation from '$lib/components/navbarCompensation.svelte';
	import Header from '$lib/components/header.svelte';
	import InputBar from './inputBar.svelte';
	import Message from './message.svelte';
	import ArrowBackUp from 'virtual:icons/tabler/arrow-back-up';
	import type { PageProps } from './$types';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';

	const longMessage = 'hello how are you doing';

	let { data: propData }: PageProps = $props();
	let messages = $state([
		{ text: longMessage, selfSent: true },
		{ text: 'great', selfSent: false },
		{ text: 'do you want to go gym???', selfSent: false },
		{ text: "yeah bro!!! let's go gym!!! yeah gym!!!", selfSent: true }
	]);
	let chatMembers: { id: number; name: string; age: number }[] = $state([]);

	const inputBarSubmitCallback = (text: string) => {
		messages.push({ text, selfSent: true });
	};

	onMount(async () => {
		const currentUserId = Number(sessionStorage.getItem('user_id'));

		const { data: response, error } = await supabase
			.from('users_chats')
			.select('user_id, users (name, age)')
			.eq('chat_id', propData.chat_id);

		if (error) {
			throw new Error('Failed to load chat data');
		}

		const filteredResponse = response.filter((usersChats) => usersChats.user_id !== currentUserId);
		chatMembers = filteredResponse.map((usersChats) => ({
			id: usersChats.user_id,
			name: usersChats.users.name,
			age: usersChats.users.age
		}));
	});
</script>

{#snippet returnButton()}
	<a href="/messages/" aria-label="Back" class="p-2 active:bg-gray-300">
		<ArrowBackUp />
	</a>
{/snippet}

<div class="h-dvh w-full overflow-y-scroll bg-gray-100 relative pb-4">
	<Header
		leftSnippet={returnButton}
		mainText={chatMembers.length > 0 ? `${chatMembers[0].name}, ${chatMembers[0].age}` : ''}
	/>
	<div class="mt-4 space-y-5">
		{#each messages as message}
			<Message text={message.text} selfSent={message.selfSent} />
		{/each}
	</div>
	<NavbarCompensation size="h-32" />
</div>

<InputBar submitCallback={inputBarSubmitCallback} />

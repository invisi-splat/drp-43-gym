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

	let { data: chatInfo }: PageProps = $props();

	let chatMembers: { id: number; name: string; age: number }[] = $state([]);
	let currentUserId: number | null = $state(null);

	const inputBarSubmitCallback = async (text: string) => {
		const { data: response, error } = await supabase
			.from('messages')
			.insert({
				body: text,
				chat_id: chatInfo.id,
				user_id: currentUserId!
			})
			.select('*')
			.single();

		if (error) {
			throw new Error('Failed to send message');
		}

		chatInfo.messages.push(response);
	};

	onMount(async () => {
		currentUserId = Number(sessionStorage.getItem('user_id'));

		const { data: response, error } = await supabase
			.from('users_chats')
			.select('user_id, users (name, age)')
			.eq('chat_id', chatInfo.id);

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
	{#if currentUserId === null}
		<div class="flex w-full p-4 justify-center">
			<p>Loading chat...</p>
		</div>
	{:else}
		<div class="mt-4 space-y-5">
			{#each chatInfo.messages as message}
				<Message text={message.body} selfSent={message.user_id === currentUserId} />
			{/each}
		</div>
	{/if}
	<NavbarCompensation size="h-32" />
</div>

<InputBar submitCallback={inputBarSubmitCallback} />

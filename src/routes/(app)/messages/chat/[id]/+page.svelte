<script lang="ts">
	import NavbarCompensation from '$lib/components/navbarCompensation.svelte';
	import Header from '$lib/components/header.svelte';
	import InputBar from './inputBar.svelte';
	import Message from './message.svelte';
	import ArrowBackUp from 'virtual:icons/tabler/arrow-back-up';
	import type { PageProps } from './$types';
	import { onDestroy, onMount } from 'svelte';
	import { supabase } from '$lib/supabase';

	let { data: chatInfo }: PageProps = $props();

	let messages: {
		body: string;
		chat_id: number;
		id: number;
		user_id: number;
	}[] = $state(chatInfo.messages);

	let chatMembers: { id: number; name: string; age: number }[] = $state([]);
	let currentUserId: number | null = $state(null);

	let channel: ReturnType<typeof supabase.channel> | null = null;
	let messageContainer: HTMLDivElement | null = $state(null);

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
	};

	$effect(() => {
		if (messageContainer) {
			setTimeout(() => {
				messageContainer!.scrollTop = messageContainer!.scrollHeight;
			}, 50);
		}
	});

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

		supabase
			.channel('changes')
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: 'messages',
					filter: `chat_id=eq.${chatInfo.id}`
				},
				(payload) => {
					console.log(payload);
					// @ts-ignore we know that the payload is of the correct type
					messages.push(payload.new);
					setTimeout(() => {
						messageContainer!.scrollTop = messageContainer!.scrollHeight;
					}, 50);
				}
			)
			.subscribe();
	});

	onDestroy(() => {
		if (channel) {
			supabase.removeChannel(channel);
			channel = null;
		}
	});
</script>

{#snippet returnButton()}
	<a href="/messages/" aria-label="Back" class="p-2 active:bg-gray-300">
		<ArrowBackUp />
	</a>
{/snippet}

<div
	bind:this={messageContainer}
	class="h-dvh w-full overflow-y-scroll overscroll-none bg-gray-100 relative pb-4"
>
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
			{#each messages as message}
				<Message text={message.body} selfSent={message.user_id === currentUserId} />
			{:else}
				<div class="flex w-full p-4 text-gray-400 justify-center">
					<p>No messages yet. Get chatting!</p>
				</div>
			{/each}
		</div>
	{/if}
	<NavbarCompensation size="h-32" />
</div>

<InputBar submitCallback={inputBarSubmitCallback} />

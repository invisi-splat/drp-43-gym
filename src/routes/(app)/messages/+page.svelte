<script lang="ts">
	import NavbarCompensation from '$lib/components/navbarCompensation.svelte';
	import Chat from './chat.svelte';
	import ChatDivider from './chatDivider.svelte';
	import Header from '$lib/components/header.svelte';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';

	// XXX the types for this really should be fixed... but i am so tired
	let chats: any = $state([]);

	onMount(async () => {
		const currentUserId = Number(sessionStorage.getItem('user_id'));

		const { data, error } = await supabase.rpc('get_chat_containing_user', {
			user1: currentUserId
		});

		if (error) {
			throw new Error(`Error fetching chats: ${error.message}`);
		}

		chats = Object.entries(
			Object.groupBy(
				data.filter((chat) => chat.user_id != currentUserId),
				(chat) => chat.chat_id
			)
		);
	});
</script>

<div class="h-dvh w-full overflow-y-scroll bg-gray-100 relative pb-4">
	<Header mainText="Messages" />
	<div class="h-4"></div>
	<!-- HACK this fully runs off the assumption that the only chats that exist are 2-person DMs -->
	{#if chats.length > 0}
		<Chat chatId={chats[0][0]} chatName={chats[0][1][0].name} chatPreview={'...'} />
		{#each chats.slice(1) as chat}
			<ChatDivider />
			<Chat chatId={chat[0]} chatName={chat[1][0].name} chatPreview={'...'} />
		{/each}
	{:else}
		<div class="flex w-full p-4 justify-center">
			<p>No chats created.</p>
		</div>
	{/if}
	<!-- required to prevent last message from being hidden by navbar -->
	<NavbarCompensation />
</div>

<script lang="ts">
	import NavbarCompensation from '$lib/components/navbarCompensation.svelte';
	import Chat from './chat.svelte';
	import ChatDivider from './chatDivider.svelte';
	import Header from '$lib/components/header.svelte';
</script>

<div class="h-dvh w-full overflow-y-scroll bg-gray-100 relative pb-4">
	<Header mainText="Messages" />
	<Chat />
	{#each { length: 10 } as _}
		<ChatDivider />
		<Chat />
	{/each}
	<!-- required to prevent last message from being hidden by navbar -->
	<NavbarCompensation />
</div>

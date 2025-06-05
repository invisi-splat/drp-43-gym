<script lang="ts">
	import NavbarCompensation from '$lib/components/navbarCompensation.svelte';
	import Chat from './chat.svelte';
	import ChatDivider from './chatDivider.svelte';
</script>

<div class="h-dvh w-full overflow-y-scroll bg-gray-100 relative pb-4">
	<h1 class="top-0 p-4 font-bold text-2xl mb-4 bg-gray-200 h-auto sticky shadow-sm/50">Messages</h1>
	<Chat />
	{#each { length: 10 } as _}
		<ChatDivider />
		<Chat />
	{/each}
	<!-- required to prevent last message from being hidden by navbar -->
	<NavbarCompensation />
</div>

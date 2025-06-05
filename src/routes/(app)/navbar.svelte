<script lang="ts">
	import UsersGroup from 'virtual:icons/tabler/users-group';
	import Message from 'virtual:icons/tabler/message';
	import { page } from '$app/state';
</script>

{#snippet entry(path: string, Icon: typeof UsersGroup)}
	<a
		href={path}
		aria-label={path}
		class="col-span-1 {page.url.pathname === path
			? 'bg-blue-400 saturate-100'
			: 'bg-blue-300'} flex justify-center items-center active:saturate-50"
	>
		<Icon class="text-3xl" />
	</a>
{/snippet}

<div class="absolute bottom-0 z-10 w-full h-15 bg-blue-300 grid grid-cols-2 upper-shadow">
	{@render entry('/community', UsersGroup)}
	{@render entry('/messages', Message)}
</div>

<style>
	.upper-shadow {
		box-shadow: 0px -5px 10px grey;
	}
</style>

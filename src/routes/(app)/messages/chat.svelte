<script lang="ts">
	import { fly } from 'svelte/transition';
	import PlaceholderUser from 'virtual:icons/tabler/user-circle';

	interface Props {
		chatId: number;
		chatName: string;
		chatPreview: string;
	}

	let { chatId, chatName, chatPreview }: Props = $props();
</script>

<a
	href="/messages/chat/{chatId}"
	class="h-18 grid grid-cols-[20%_auto] active:bg-gray-200 transition-colors select-none py-2"
>
	<div class="col-span-1 flex justify-center items-center">
		<PlaceholderUser class="text-3xl" />
	</div>
	<div class="col-span-1 grid grid-rows-[60%_auto]">
		<div class="row-span-1 font-bold text-xl">{chatName}</div>
		<div class="row-span-1 text-sm text-gray-500">{chatPreview}</div>
	</div>
</a>

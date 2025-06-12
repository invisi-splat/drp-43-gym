<script lang="ts">
	interface MessageProps {
		text: string;
		selfSent?: boolean;
	}

	let { text, selfSent = false }: MessageProps = $props();
</script>

<div class="flex {selfSent ? 'justify-end' : 'justify-start'} px-4">
	<div class="max-w-[85%] rounded-2xl {selfSent ? 'bg-blue-200' : 'bg-gray-200'} p-3 shadow-sm">
		{text}
	</div>
</div>

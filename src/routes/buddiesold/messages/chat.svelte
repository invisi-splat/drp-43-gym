<script lang="ts">
	import TablerUserCircle from 'virtual:icons/tabler/user-circle';

	interface Props {
		name?: string;
		preview?: string;
	}

	let {
		name = 'Bob',
		preview = "Skibidi lorem ipsum dolor sit amet, gyatt consectetur adipiscing elit, no cap rizzler sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Bussin' ut enim ad minim veniam, only in Ohio quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Sussy imposter duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Sigma male excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Poggers livvy dunne rizzed up baby gronk, fr fr."
	}: Props = $props();
</script>

<button
	class="w-full flex flex-col items-center gap-4 p-2 border-2 border-black active:bg-gray-200"
>
	<div class="text-3xl w-full bold grid grid-cols-6">
		<div class="col-span-1">
			<TablerUserCircle></TablerUserCircle>
		</div>
		<p class="col-span-5 text-left">{name}</p>
	</div>
	<div class="h-10 text-ellipsis overflow-hidden block text-left">{preview}</div>
</button>

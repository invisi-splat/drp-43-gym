<script lang="ts">
	import TablerSend from 'virtual:icons/tabler/send';
	import { Day } from '$lib/types/induction';

	interface Props {
		name: string;
		age: number;
		type: string;
		day: Day;
	}

	let props: Props = $props();
</script>

<div class="w-[80%] p-4 border-2 border-black text-2xl flex">
	<div class="w-[80%] space-y-2">
		<p class="font-bold">{props.name}, {props.age}</p>
		<p class="italic">
			<span class="underline capitalize">{props.type}</span> <span class="text-xl">on</span>
			{props.day}
		</p>
	</div>
	<div class="flex h-full justify-center items-center">
		<button>
			<TablerSend style="font-size: 2rem"></TablerSend>
		</button>
	</div>
</div>

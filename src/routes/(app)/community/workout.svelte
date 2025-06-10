<script lang="ts">
	import User from 'virtual:icons/tabler/user';
	import UserPlus from 'virtual:icons/tabler/user-plus';
	import PinFilled from 'virtual:icons/tabler/map-pin-filled';
	import MoodCheck from 'virtual:icons/tabler/mood-check';
	import Send from 'virtual:icons/tabler/send';
	import dayjs from 'dayjs';
	import { supabase } from '$lib/supabase';
	import { invalidate } from '$app/navigation';
	import { page } from '$app/state';
	import { get } from 'svelte/store';

	const { id } = $props();

	import { derived } from 'svelte/store';
	import { workouts } from '$lib/stores/workout';
	const workout = derived(workouts, ($workouts) => $workouts.find((w) => w.id === id));

	async function handleClick() {
		if (!$workout) return;
		console.log(
			'updating id: ',
			$workout.id,
			', (',
			$workout.name,
			') from friend: ',
			$workout.isFriend,
			' to friend=',
			!$workout.isFriend
		);
		const newIsFriend = !$workout.isFriend;

		const { error } = await supabase
			.from('workouts')
			.update({ isFriend: newIsFriend })
			.eq('id', $workout.id);

		if (error) {
			console.error('Error updating friend status:', error);
			return;
		}

		//retrigger data load
		await invalidate(page.url.pathname);

		//update the storee
		workouts.update((ws) =>
			ws.map((w) => (w.id === $workout.id ? { ...w, isFriend: newIsFriend } : w))
		);

		console.log('Updated successfully!');
	}
</script>

<div class="w-full flex flex-col items-center">
	<div class="rounded-2xl bg-gray-300 p-2 w-[90%] grid grid-cols-[40%_auto] gap-x-2">
		<div class="col-span-1 flex flex-col gap-y-1">
			<div class="rounded-2xl bg-gray-200 flex justify-center items-center p-1 gap-x-1 min-w-0">
				<User />
				<div class="bg-gray-200 w-[80%] flex flex-col items-center justify-center min-w-0">
					<h2 class="font-bold w-full flex flex-wrap gap-x-1 justify-center items-center" lang="en">
						<span class="max-w-full inline-block line-clamp-2 hyphens-auto text-center"
							>{$workout?.name}, {$workout?.age}</span
						>
					</h2>
					<h3 class="text-xs italic">{$workout?.skill}</h3>
				</div>
			</div>

			<div class="grow flex justify-center items-center">
				<PinFilled class="inline mr-1" />
				<p class="w-[50%]">
					<span>{$workout?.location} @</span>
					<span class="font-bold">{dayjs($workout?.dateTime).format('ddd DD/MM, h:mma')}</span>
				</p>
			</div>
			<!-- DO NOT NEED FRIENDS RIGHT NOW, CAN BE FUTURE USER STORY
			<div class="grow flex justify-center items-center">
				<button
					class="p-2 {$workout?.isFriend
						? 'bg-green-100'
						: 'bg-white'} rounded-md text-xs flex items-center"
					onclick={handleClick}
				>
					{#if $workout?.isFriend}
						<MoodCheck class="inline mr-2" /><span>Friends</span>
					{:else}
						<UserPlus class="inline mr-2" /><span>Add friend</span>
					{/if}
				</button>
			</div>
		-->
		</div>
		<div class="col-span-1 rounded-2xl bg-white px-3 py-1 space-y-1 relative">
			<h2 class="whitespace-pre font-bold">
				<span class="text-gray-600">Training</span>
				<span class="underline">{$workout?.regimen}</span>
			</h2>
			<p class="text-[0.65rem] line-clamp-3 hyphens-auto">{$workout?.desc}</p>
			<div class="text-sm flex justify-between items-center gap-x-1">
				<!--  COMMENTING MSG-ING FOR NOW, add back later ?
				<a href="/messages/chat" class="bg-gray-200 p-1.5 rounded-xl">
					<Send />
				</a>
				-->
			</div>
		</div>
	</div>
</div>

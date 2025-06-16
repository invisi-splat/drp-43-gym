<script lang="ts">
	import { Button, Dropdown, DropdownGroup, DropdownHeader, DropdownItem } from 'flowbite-svelte';
	import { onMount, type Snippet } from 'svelte';
	import { supabase } from '$lib/supabase';
	import ChevronDown from 'virtual:icons/tabler/chevron-down';

	interface HeaderProps {
		mainText: string;
		leftSnippet?: Snippet;
		rightSnippet?: Snippet;
	}

	let name = $state('');

	let { mainText, leftSnippet, rightSnippet }: HeaderProps = $props();

	onMount(async () => {
		name = sessionStorage.getItem('user_id')!;

		const { data, error } = await supabase
			.from('users')
			.select('name')
			.eq('id', parseInt(name))
			.single();

		if (error) {
			console.error('Error fetching user name:', error);
			name = 'Name error';
			return;
		}

		name = data.name || 'User';
	});

	const signOutHandler = () => {
		sessionStorage.removeItem('user_id');
		window.location.href = '/';
	};
</script>

<h1 class="z-50 top-0 py-2 px-4 bg-gray-200 h-auto sticky shadow-sm/50 flex items-center gap-x-4">
	{@render leftSnippet?.()}
	<p class="py-2 font-bold text-xl">{mainText}</p>
	{@render rightSnippet?.()}
	<div class="flex-grow flex justify-end items-center">
		<Button class="bg-blue-500 px-2">Profile<ChevronDown /></Button>
		<Dropdown>
			<DropdownHeader>
				<span class="block text-sm text-gray-900 dark:text-white italic font-normal"
					>Logged in as <span class="font-bold">{name}</span></span
				>
			</DropdownHeader>
			<DropdownGroup>
				<DropdownItem onclick={signOutHandler}>Log out</DropdownItem>
			</DropdownGroup>
		</Dropdown>
	</div>
</h1>

<script>
	import NavbarCompensation from '$lib/components/navbarCompensation.svelte';
	import Header from '../header.svelte';
	import InputBar from './inputBar.svelte';
	import Message from './message.svelte';

	const longMessage =
		'In the silent spaces between each heartbeat, the universe whispers its ancient secrets. Shadows stretch not to conceal, but to reveal the subtle dance of light and time. Every fleeting moment is both an ending and a beginning, a paradox wrapped in the gentle embrace of now. The river does not rush to its destination; it savors every stone, every bend, teaching us the art of presence. To ponder is to plant seeds in the fertile soil of wonder, where questions bloom into understanding. We are all travelers on a path paved with uncertainty, guided by the stars of intention and the moonlight of curiosity. In the tapestry of existence, every thread—no matter how small—holds the pattern together.';
</script>

<div class="h-dvh w-full overflow-y-scroll bg-gray-100 relative pb-4">
	<Header returnButton mainText="Epic chat" />
	<div class="space-y-5">
		<Message text={longMessage} selfSent />
		<Message text="yeah bruh ts is fire!!" />
		<Message text="do you want to go gym???" />
		<Message text="yeah bro!!! let's go gym!!! yeah gym!!!" selfSent />
	</div>
	<NavbarCompensation size="h-32" />
</div>

<InputBar />

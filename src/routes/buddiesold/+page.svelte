<script lang="ts">
	import Chatroom from '../buddies/chatroom.svelte';
	import Navbar from './navbar.svelte';
</script>

<h1 class="text-4xl my-5">Welcome back!</h1>
<div class="flex flex-col items-center gap-y-2 w-full">
	<Chatroom name="Jim" age={22} type="back" day="Monday"></Chatroom>
	<Chatroom name="Maya" age={21} type="arms" day="Tuesday"></Chatroom>
</div>

<script lang="ts">
	import TablerUsers from 'virtual:icons/tabler/users';
	import TablerMessage from 'virtual:icons/tabler/message';
	import TablerCalender from 'virtual:icons/tabler/calendar-month';
</script>

<div
	class="absolute w-full h-30 border-t-4 border-black bottom-0 grid grid-cols-3 gap-x-2 py-2 justify-center bg-white"
>
	<a href="/buddies/" class="col-span-1 flex justify-center items-center">
		<TablerUsers style="font-size: 4rem"></TablerUsers>
	</a>
	<a href="/buddies/messages" class="col-span-1 flex justify-center items-center">
		<TablerMessage style="font-size: 4rem"></TablerMessage>
	</a>
	<a href="/buddies/schedule" class="col-span-1 flex justify-center items-center">
		<TablerCalender style="font-size: 4rem"></TablerCalender>
	</a>
</div>

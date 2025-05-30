<script lang="ts">
	import { fly } from "svelte/transition";

  let { children } = $props();
</script>


<div in:fly={{ x: 300, delay: 200 }} out:fly={{ x: -300, duration: 200 }} class="relative -top-20 w-full h-full flex flex-col items-center justify-center gap-5">
  {@render children()}
</div>
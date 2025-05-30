<!-- TODO this should really be getting data from the previous onboarding step... but that's going to take more time than we have -->

<script lang="ts">
	import type { Database } from "$lib/types/supabase";
  import Header from "./header.svelte";
  import { AccordionItem, Accordion } from "flowbite-svelte";

  type Stage = {
    name: string,
    workouts: any
  }
  type Tour = Stage[]

  const tour: Tour = [
    {name: "Tour and cardio", workouts: null },
    {name: "Strength basics", workouts: null },
    {name: "Free weights and stretching", workouts: null },
  ]
</script>

<div class="w-full h-full flex flex-col items-center">
  <Header/>
  <div class="w-[80%] mt-10">
    <Accordion>
      {#each tour as stage, index}
      <AccordionItem>
        {#snippet header()}Stage {index + 1}: {stage.name}{/snippet}
        <div>Treadmill</div>
      </AccordionItem>
      {/each}
    </Accordion>
  </div>
</div>

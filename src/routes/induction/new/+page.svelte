<script lang="ts">
  import Page from "./page.svelte";
  import { trainingGoals, machineTypes } from "$lib/types/induction"; // FIXME replace machines with a call to a db
	import { SvelteSet } from "svelte/reactivity";
	import { fade } from "svelte/transition";
  
  interface Form {
    goal: string
    selectedMachines: SvelteSet<string>
  }

  let page = $state(0);
  let form: Form = $state({ goal: "", selectedMachines: new SvelteSet()})

  let showNext = $state(false)

  const advancePage = () => {
    page++;
    showNext = false;
  }
</script>


{#snippet goal(g: string)}
<button class="w-full bg-green-100 p-4 text-2xl active:bg-green-200" onclick={() => {form.goal = g; advancePage()}}>
  { g }
</button>
{/snippet}

{#snippet machine(m: string)}
<button class="p-4 text-2xl {form.selectedMachines.has(m) ? "bg-blue-300" : "bg-blue-50"}" onclick={() => {
  if (form.selectedMachines.has(m)) {
    form.selectedMachines.delete(m)
  } else {
    form.selectedMachines.add(m)
  }
  showNext = form.selectedMachines.size !== 0
}}>
  { m }
</button>
{/snippet}

<div class="w-full h-svh p-4">
  {#if page === 1}
  <Page>
    <h1 class="text-5xl font-bold text-center">What is your fitness goal?</h1>
    <div class="mt-5 flex flex-col gap-3">
      {#each trainingGoals as trainingGoal}
        {@render goal(trainingGoal)}
      {/each}
    </div>
  </Page>
  {:else if page === 2}
  <Page>
    <h1 class="text-5xl font-bold text-center">What is your experience level?</h1>
    <p>... experience level choices ...</p>
    <button class="bg-orange-100 p-4 text-xl" onclick={() => page++}>Placeholder choice</button>
  </Page>
  {:else if page === 3}
  <Page>
    <h1 class="text-5xl font-bold text-center">What equipment would you like to focus on?</h1>
    {#each machineTypes as machineType}
      {@render machine(machineType)}
    {/each}
  </Page>
  {:else if page === 4}
  <Page>
    <h1 class="text-5xl font-bold text-center">Are there any physical limitations?</h1>
    <p>... physical limitations ...</p>
    <button class="bg-orange-100 p-4 text-xl">Placeholder choice</button>
  </Page>
  {:else}
  <Page>
    <h1 class="text-5xl font-bold">Welcome!</h1>
    <p class="text-center text-2xl">We'd like to ask you a few questions to help select machines for you to start on.</p>
    <button class="p-3 bg-amber-200 active:bg-amber-400 text-3xl font-semibold mt-10" onclick={advancePage}>Start</button>
  </Page>
  {/if}
</div>

{#if ([1, 2, 3, 4].includes(page))}
<div class="absolute bottom-24 w-full flex justify-center items-center gap-x-5">
  {#if ([1, 2].includes(page)) || !showNext}
    <button in:fade class="bg-gray-100 italic py-3 px-5 text-2xl active:bg-gray-200" onclick={advancePage}>
      Skip
    </button>
  {/if}
  {#if ([3, 4].includes(page)) && showNext}
    <button in:fade class="p-3 bg-amber-200 active:bg-amber-400 text-2xl italic" onclick={advancePage}>
      Next
    </button>
  {/if}
</div>
{/if}
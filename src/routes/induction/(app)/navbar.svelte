<script lang="ts">
import Mountain from "virtual:icons/tabler/mountain"
import MountainFilled from "virtual:icons/tabler/mountain-filled"
import MapPin from "virtual:icons/tabler/map-pin"
import MapPinFilled from "virtual:icons/tabler/map-pin-filled"

import { page } from "$app/state";
</script>

<div class="absolute bottom-0 h-20 w-full grid grid-cols-2 border-t-4 border-black">
  <a href="/induction/new" class="col-span-1 flex justify-center items-center">
    {#if page.url.pathname === "/induction/new"}
    <MountainFilled style="font-size: 3rem"/>
    {:else}
    <Mountain style="font-size: 3rem"/>
    {/if}
  </a>
  <a href="/induction/map" class="col-span-1 flex justify-center items-center">
    {#if page.url.pathname === "/induction/map"}
    <MapPinFilled style="font-size: 3rem"/>
    {:else}
    <MapPin style="font-size: 3rem"/>
    {/if}
  </a>
</div>
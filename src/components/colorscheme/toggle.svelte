<script>
  import MoonIcon from "icons/hero/outline/moon.svelte";
  import SunIcon from "icons/hero/outline/sun.svelte";
  import MoonSolidIcon from "icons/hero/solid/moon.svelte";
  import SunSolidIcon from "icons/hero/solid/sun.svelte";
  import { colorScheme, prefersColorScheme } from "./store";
</script>

<button
  class="inline-flex items-center p-1 transition duration-200 motion-reduce:transition-none sm:motion-safe:hover:rotate-12 sm:motion-safe:hover:scale-110"
  aria-label="Switch color scheme"
  on:click={() =>
    colorScheme.update((s) => (s === "light" ? "dark" : s === "dark" ? null : "light"))}
>
  {#if $colorScheme === "dark"}
    <MoonSolidIcon class="h-7 w-7" />
  {:else if $colorScheme === "light"}
    <SunSolidIcon class="h-7 w-7" />
  {:else if $prefersColorScheme === "dark"}
    <MoonIcon class="h-7 w-7" />
  {:else if $prefersColorScheme === "light"}
    <SunIcon class="h-7 w-7" />
  {:else}
    <div class="h-7 w-7" />
  {/if}
</button>

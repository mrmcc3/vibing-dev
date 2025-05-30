---
{
  title: "Prose Test",
  description: "A bunch of interesting test cases for prose",
  slug: "test-page",
}
---

> a quote

Some typescript

```ts
import { defineCollection, z } from "astro:content";

const published = defineCollection({
  schema: z.object({
    kind: z.enum(["article", "note"]).default("note"),
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.string().array().default([]),
  }),
});

export const collections = { published };
```

Some images

![which way to go](./images/signpost.webp) ![which way to go](/icon-192.png)

Some svelte

```svelte
<script>
  import { colorScheme, prefersColorScheme } from "./store";
  import MoonSolidIcon from "icons/hero/solid/moon.svelte";
  import SunSolidIcon from "icons/hero/solid/sun.svelte";
  import MoonIcon from "icons/hero/outline/moon.svelte";
  import SunIcon from "icons/hero/outline/sun.svelte";
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
```

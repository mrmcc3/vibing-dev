import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://vibing.dev",
  markdown: { shikiConfig: { theme: "css-variables" } },
  integrations: [svelte(), mdx()],
});

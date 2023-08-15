import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import markdoc from "@astrojs/markdoc";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://vibing.dev",
  trailingSlash: "never",
  experimental: { assets: true, viewTransitions: true },
  integrations: [
    svelte(),
    tailwind(),
    markdoc(),
    sitemap({
      filter: (p) => !p.includes("/draft/"),
    }),
  ],
});

import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://vibing.dev",
  markdown: {
    drafts: true,
  },
  integrations: [tailwind(), svelte()],
  vite: {
    build: {
      rollupOptions: {
        output: {
          entryFileNames: "static/build/[hash].js",
          chunkFileNames: "static/build/[hash].js",
          assetFileNames: "static/build/[hash][extname]",
        },
      },
    },
  },
});

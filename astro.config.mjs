import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://vibing.dev",
  markdown: {
    drafts: true,
    shikiConfig: {
      theme: "css-variables",
    },
  },
  integrations: [svelte()],
  vite: {
    build: {
      assetsInlineLimit: 0,
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

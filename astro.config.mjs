import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";
import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    data.astro.frontmatter.minutesRead = readingTime.text;
  };
}

// https://astro.build/config
export default defineConfig({
  site: "https://vibing.dev",
  markdown: {
    remarkPlugins: [remarkReadingTime],
    extendDefaultPlugins: true,
    shikiConfig: { theme: "css-variables" },
  },
  integrations: [svelte(), sitemap()],
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

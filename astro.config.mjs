import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
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
    shikiConfig: { theme: "css-variables" },
  },
  integrations: [
    svelte(),
    mdx({
      remarkPlugins: [remarkReadingTime],
      extendPlugins: "astroDefaults",
    }),
    sitemap(),
  ],
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

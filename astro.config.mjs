import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";

import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";
export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    // readingTime.text will give us minutes read as a friendly string,
    // i.e. "3 min read"
    data.astro.frontmatter.minutesRead = readingTime.text;
  };
}

export default defineConfig({
  site: "https://vibing.dev",
  markdown: {
    shikiConfig: { theme: "css-variables" },
    remarkPlugins: [remarkReadingTime],
    extendDefaultPlugins: true,
  },
  integrations: [svelte(), mdx()],
  trailingSlash: "never",
});

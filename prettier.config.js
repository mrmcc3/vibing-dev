export default {
  printWidth: 100,
  proseWrap: "always",
  plugins: ["prettier-plugin-astro", "prettier-plugin-svelte", "prettier-plugin-tailwindcss"],
  overrides: [
    { files: "*.astro", options: { parser: "astro" } },
    { files: "*.svelte", options: { parser: "svelte" } },
    { files: "*.mdoc", options: { parser: "markdown" } },
  ],
};

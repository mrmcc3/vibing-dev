module.exports = {
  printWidth: 100,
  plugins: [
    require("prettier-plugin-astro"),
    require("prettier-plugin-svelte"),
    require("prettier-plugin-tailwindcss"),
  ],
  pluginSearchDirs: false,
  overrides: [
    { files: "*.astro", options: { parser: "astro" } },
    { files: "*.svelte", options: { parser: "svelte" } },
  ],
};

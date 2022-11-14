module.exports = {
  plugins: [
    require("prettier-plugin-svelte"),
    require("prettier-plugin-astro"),
    require("prettier-plugin-tailwindcss"),
  ],
  pluginSearchDirs: false,
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};

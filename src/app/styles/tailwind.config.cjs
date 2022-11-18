const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "src/app/**/*.{astro,svelte}",
    "src/shared/**/*.{astro,svelte}",
    "src/pages/app/**/*.{astro,svelte}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["General Sans", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

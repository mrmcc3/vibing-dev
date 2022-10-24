const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "src/**/*.{astro,svelte}",
    "!src/app/**/*.{astro,svelte}",
    "!src/pages/app/**/*.{astro,svelte}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lexend", ...defaultTheme.fontFamily.sans],
      },
      colors: ({ colors }) => ({
        gray: colors.neutral,
      }),
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

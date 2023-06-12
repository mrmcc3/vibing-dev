const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["src/**/*.{astro,svelte,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"General Sans"', ...defaultTheme.fontFamily.sans],
        mono: ['"Berkeley Mono"', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
};

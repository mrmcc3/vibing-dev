const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,jsx,svelte,tsx,vue}"],
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

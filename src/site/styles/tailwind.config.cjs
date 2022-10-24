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
        mono: ['"Jetbrains Mono"', ...defaultTheme.fontFamily.mono],
      },
      colors: ({ colors }) => ({
        gray: colors.neutral,
      }),
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            code: {
              fontWeight: "400",
              backgroundColor: "var(--astro-code-color-background)",
              borderRadius: "6px",
              paddingTop: "0.2em",
              paddingRight: "0.4em",
              paddingBottom: "0.2em",
              paddingLeft: "0.4em",
            },
            "code::before": {
              content: "normal",
            },
            "code::after": {
              content: "normal",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};

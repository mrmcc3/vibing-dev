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
    colors: {
      gray: {
        // Subtle Backgrounds
        1: "hsl(var(--gray1) / <alpha-value>)",
        2: "hsl(var(--gray2) / <alpha-value>)",
        // Component Backgrounds
        3: "hsl(var(--gray3) / <alpha-value>)", // normal
        4: "hsl(var(--gray4) / <alpha-value>)", // hover
        5: "hsl(var(--gray5) / <alpha-value>)", // active
        // Borders
        6: "hsl(var(--gray6) / <alpha-value>)", // subtle / non-interactive
        7: "hsl(var(--gray7) / <alpha-value>)", // interactive / focus rings
        8: "hsl(var(--gray8) / <alpha-value>)", // hover
        // Solid Backgrounds
        DEFAULT: "hsl(var(--gray9) / <alpha-value>)",
        9: "hsl(var(--gray9) / <alpha-value>)", // purest
        10: "hsl(var(--gray10) / <alpha-value>)", // Hover
        // Text
        11: "hsl(var(--gray11) / <alpha-value>)", // low contrast
        12: "hsl(var(--gray12) / <alpha-value>)", // high contrast
      },
    },
    extend: {
      fontFamily: {
        sans: ["Lexend", ...defaultTheme.fontFamily.sans],
        mono: ['"Jetbrains Mono"', ...defaultTheme.fontFamily.mono],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            code: {
              color: "var(--astro-code-color-text)",
              fontWeight: "500",
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

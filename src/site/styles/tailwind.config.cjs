const defaultTheme = require("tailwindcss/defaultTheme");

function radixColor(name, i) {
  return `hsl(var(--${name}${i}) / <alpha-value>)`;
}

function radixScale(name) {
  const scale = { DEFAULT: radixColor(name, 9) };
  for (const i of Array(12).keys()) {
    scale[`${i + 1}`] = radixColor(name, i + 1);
  }
  return scale;
}

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
      gray: radixScale("gray"),
      teal: radixScale("teal"),
      purple: radixScale("purple"),
      bronze: radixScale("bronze"),
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

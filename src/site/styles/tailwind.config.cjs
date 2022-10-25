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
      gray: radixScale("slate"),
      teal: radixScale("teal"),
      indigo: radixColor("indigo"),
      purple: radixScale("plum"),
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
              color: "hsl(var(--teal10))",
              fontWeight: "500",
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

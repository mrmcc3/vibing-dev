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
      inherit: "inherit",
      current: "currentColor",
      transparent: "transparent",
      black: "#000",
      white: "#fff",
      gray: radixScale("slate"),
      teal: radixScale("teal"),
      indigo: radixScale("indigo"),
      plum: radixScale("plum"),
    },
    extend: {
      fontFamily: {
        sans: ["Lexend", ...defaultTheme.fontFamily.sans],
        mono: ['"Jetbrains Mono"', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

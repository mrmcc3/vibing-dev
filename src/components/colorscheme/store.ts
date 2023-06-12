import { readable, writable } from "svelte/store";

export const prefersColorScheme = readable("", function start(set) {
  if (import.meta.env.SSR) return; // client only
  const pref = globalThis.matchMedia("(prefers-color-scheme: dark)");
  const listener = (e: MediaQueryListEvent) => set(e.matches ? "dark" : "light");
  pref.addEventListener("change", listener);
  set(pref.matches ? "dark" : "light");
  return function stop() {
    pref.removeEventListener("change", listener);
  };
});

export const colorScheme = writable("", function start(set) {
  if (import.meta.env.SSR) return; // client only
  set(localStorage.colorScheme);
});

colorScheme.subscribe((cs) => {
  if (import.meta.env.SSR) return; // client only
  const prev = localStorage.colorScheme;
  if (prev !== cs) {
    if (cs) localStorage.setItem("colorScheme", cs);
    else localStorage.removeItem("colorScheme");
    globalThis.applyColorScheme();
  }
});

---
layout: "@site/Note.astro"
title: "Web Color Schemes"
description: "Notes on how to implement color schemes (Dark Mode) for the web"
pubDate: "2022-10-28T09:16:07Z"
draft: true
---

Notes on how to implement color schemes (Dark Mode) for the web

> Update: **2022-11-11** blah blah laskdjfl aslkdfjl s aslkdfj
> asldkfjl asdlkf jasd asdlkfjlsadjf

## Color Scheme

No one shall be subjected to arbitrary arrest, detention or exile.
Everyone is entitled in full equality to a fair and public hearing by an independent and impartial tribunal, in the determination of his rights and obligations and of any criminal charge against him.

No one shall be subjected to arbitrary interference with his privacy, family, home or correspondence, nor to attacks upon his honour and reputation. Everyone has the right to the protection of the law against such interference or attacks.

Also known as **dark mode**. In our *implementation*

- We'll deliver CSS that supports both schemes light and dark
  - Styling is done via tailwind. which supports `dark:` variant.
  - This is nice because styling for dark mode often requires more than just diff colours.
- Applying a certain scheme involves ensuring two things
  - the dark class is present on `<html>` or not
  - the `<meta name="color-scheme">` is set correctly
- So we get caching of static html we need to make the alterations client side
  - without flashing from one scheme to the other on load
  - no storing scheme preferences per user account. 
    - it's all managed on the client device
    - the server is completely unaware of the details of color scheme
- There are 3 modes
  - the [user explicitly](http://www.google.com) sets the color scheme to `light`.
    - the preference is stored in localstorage on the device
    - meta color-scheme needs to be set to `light`
    - the system prefered color scheme is ignored
  - the user explicity sets the color scheme to `dark`.
    - again in localstorage
    - meta color-scheme needs to be `dark`
     
      aslkdjfl asdkfjsld
      sadflkj asdlkfj
  - system (default). the user hasn't chosen or they've chosen system
    - remove the color scheme in localstorage
    - meta color-scheme needs to be set to `dark light` (browser can determine)
    - the system prefered colorscheme can change throughout the day (without page load)
      - requires setting up event handlers
- To avoid flashing of different schemes we can inject an inine script into the document head. 
  - It can expose a global function to apply the color scheme.
    - The funcntion can be called initially to set the theme
    - It can also be set up on a media query for when the system prefered scheme changes
    - It can be called by UI components that set the theme and wish to apply it
- UI elements that show/update the color scheme can 
  - Set up a global store for the explicit scheme in LS
    - when the scheme is updated, LS is synced and the theme is applied
  - Can also subscribe to the system prefered color scheme if required

``` javascript
import { readable, writable } from "svelte/store";

export const prefersColorScheme = readable(null, function start(set) {
  if (import.meta.env.SSR) return; // client only
  const pref = globalThis.matchMedia("(prefers-color-scheme: dark)");
  const listener = (e) => set(e.matches ? "dark" : "light");
  pref.addEventListener("change", listener);
  listener(pref);
  return function stop() {
    pref.removeEventListener("change", listener);
  };
});

export const colorScheme = writable(null, function start(set) {
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
```
import { defineMarkdocConfig, component } from "@astrojs/markdoc/config";
import shiki from "@astrojs/markdoc/shiki";

export default defineMarkdocConfig({
  extends: [shiki({ theme: "css-variables" })],
  tags: {
    box: {
      render: component("./src/components/box.astro"),
    },
  },
});

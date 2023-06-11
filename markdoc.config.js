import { defineMarkdocConfig, nodes } from "@astrojs/markdoc/config";
import shiki from "@astrojs/markdoc/shiki";

export default defineMarkdocConfig({
  extends: [shiki({ theme: "css-variables" })],
  nodes: {
    document: { ...nodes.document, render: null },
  },
});

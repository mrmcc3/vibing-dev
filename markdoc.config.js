import { defineMarkdocConfig, nodes } from "@astrojs/markdoc/config";
import shiki from "@astrojs/markdoc/shiki";
import Box from "components/box.astro";

export default defineMarkdocConfig({
  extends: [shiki({ theme: "css-variables" })],
  nodes: { document: { ...nodes.document, render: null } },
  tags: { box: { render: Box } },
});

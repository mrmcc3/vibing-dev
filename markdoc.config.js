import { defineMarkdocConfig, nodes } from "@astrojs/markdoc/config";
import shiki from "@astrojs/markdoc/shiki";

import paragraph from "components/markdoc/paragraph.astro";
import link from "components/markdoc/link.astro";
import heading from "components/markdoc/heading.astro";
import blockquote from "components/markdoc/blockquote.astro";
import code from "components/markdoc/code.astro";
import strong from "components/markdoc/strong.astro";
import em from "components/markdoc/em.astro";
import image from "components/markdoc/image.astro";

nodes;

export default defineMarkdocConfig({
  extends: [shiki({ theme: "css-variables" })],
  nodes: {
    document: { ...nodes.document, render: null },
    heading: { ...nodes.heading, render: heading },
    paragraph: { ...nodes.paragraph, render: paragraph },
    blockquote: { ...nodes.blockquote, render: blockquote },
    code: { ...nodes.code, render: code },
    image: { ...nodes.image, render: image },
    link: { ...nodes.link, render: link },
    strong: { ...nodes.strong, render: strong },
    em: { ...nodes.em, render: em },
  },
});

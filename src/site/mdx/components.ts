import Blockquote from "./Blockquote.astro";
import Paragraph from "./Paragraph.astro";
import Preformatted from "./Preformatted.astro";
import Code from "./Code.astro";
import Link from "./Link.astro";
import Emphasis from "./Emphasis.astro";
import Strong from "./Strong.astro";
import H1 from "./H1.astro";
import H2 from "./H2.astro";
import H3 from "./H3.astro";
import H4 from "./H4.astro";
import HR from "./HR.astro";
import UnorderedList from "./UnorderedList.astro";
import OrderedList from "./OrderedList.astro";
import ListItem from "./ListItem.astro";

export const components = {
  blockquote: Blockquote,
  p: Paragraph,
  pre: Preformatted,
  code: Code,
  a: Link,
  em: Emphasis,
  strong: Strong,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  hr: HR,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
};

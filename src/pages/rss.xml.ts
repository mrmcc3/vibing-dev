import rss, { RSSOptions } from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function get(context: RSSOptions) {
  const all = await getCollection("published");
  const pub = all.filter((p) => !p.data.draft);
  pub.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
  return rss({
    title: "vibing.dev",
    description: "Outlet for whatever I'm vibing. Mostly web dev.",
    site: context.site,
    items: pub.map(({ data: { title, pubDate, description }, slug }) => ({
      title,
      pubDate,
      description,
      link: `/${slug}`,
    })),
  });
}

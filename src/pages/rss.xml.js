import rss from "@astrojs/rss";

export function get() {
  const notes = Object.values(
    import.meta.glob("./**/*.md", { eager: true })
  ).filter(({ frontmatter: { draft, pubDate } = {} }) => !draft && pubDate);
  return rss({
    title: "vibing.dev",
    description: "Outlet for whatever I'm vibing. Mostly web dev.",
    site: import.meta.env.SITE,
    items: notes.map(({ url, frontmatter: fm, compiledContent }) => ({
      link: url,
      title: fm.title || url,
      pubDate: fm.pubDate,
      description: fm.description || compiledContent(),
    })),
  });
}

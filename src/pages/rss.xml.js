import rss from "@astrojs/rss";

export function get() {
  const notes = Object.values(
    import.meta.glob("./notes/**/*.md", { eager: true })
  ).filter(
    ({ frontmatter: { draft, pubDate, title, description } = {} }) =>
      !draft && pubDate && title && description
  );
  return rss({
    title: "vibing.dev",
    description: "Outlet for whatever I'm vibing. Mostly web dev.",
    site: import.meta.env.SITE,
    items: notes.map(({ url, frontmatter: fm }) => ({
      link: url,
      title: fm.title,
      pubDate: fm.pubDate,
      description: fm.description,
    })),
  });
}

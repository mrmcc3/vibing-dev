import rss from "@astrojs/rss";

export function get() {
  const notes = Object.values(
    import.meta.glob("./_notes/**/*.mdx", { eager: true })
  ).filter(({ draft, pubDate }) => !draft && pubDate);
  const comp = (a, b) =>
    new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
  notes.sort(comp);
  return rss({
    title: "vibing.dev",
    description: "Outlet for whatever I'm vibing. Mostly web dev.",
    site: import.meta.env.SITE,
    items: notes.map(
      ({
        url,
        path = url.slice("/_notes/".length),
        title,
        pubDate,
        description,
      }) => ({
        link: path,
        title: title || `Note ${url.split("/").at(-1)}`,
        pubDate,
        description,
      })
    ),
  });
}

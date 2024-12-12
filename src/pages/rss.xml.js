import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
	const posts = await getCollection("blog", ({ data }) => !data.draft);
	posts.sort((a, b) => b.data.pub_date.getTime() - a.data.pub_date.getTime());
	return rss({
		title: "vibing.dev",
		description: "Outlet for whatever I'm vibing. Mostly software.",
		site: context.site,
		items: posts.map(({ data: { title, description, pub_date }, id }) => ({
			title,
			pubDate: pub_date,
			description,
			link: id,
		})),
	});
}

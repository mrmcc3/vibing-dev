import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "blog" }),
	schema: z
		.object({
			title: z.string().optional(),
			description: z.string().optional(),
			pub_date: z.coerce.date().optional(),
		})
		.transform((o) => {
			return { ...o, draft: !(o.title && o.description && o.pub_date) };
		}),
});

export const collections = { blog };

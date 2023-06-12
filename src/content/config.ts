import { defineCollection, z } from "astro:content";

const published = defineCollection({
  schema: z.object({
    kind: z.enum(["article", "note"]).default("note"),
    title: z.string(),
    description: z.string(),
    draft: z.boolean().default(false),
    pubDate: z.coerce.date(),
    tags: z.string().array().default([]),
  }),
});

export const collections = { published };

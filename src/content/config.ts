import { defineCollection, z } from "astro:content";

const Kind = z.enum(["article", "note"]);

// ideas. only available locally, ignored by git. all schema is optional, just write.
const ideas = defineCollection({
  schema: z.object({
    kind: Kind.default("note"), // start small
    title: z.string().optional(),
    description: z.string().optional(),
    pubDate: z.coerce.date().optional(),
    tags: z.string().array().default([]),
  }),
});

// drafts. hidden everywhere except if you have the url.
const drafts = defineCollection({
  schema: z.object({
    kind: Kind.default("article"), // drafts are usually for articles
    title: z.string(), // working title is required
    description: z.string().optional(),
    pubDate: z.coerce.date().optional(),
    tags: z.string().array().default([]),
  }),
});

// public content. available everywhere.
const publicContent = defineCollection({
  schema: z.object({
    kind: Kind, // explicit on all public content
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.string().array().default([]),
  }),
});

export const collections = {
  ideas,
  drafts,
  public: publicContent,
};

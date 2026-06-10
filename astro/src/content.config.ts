import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Engineering writing. Bodies are placeholder (lorem) until the real
// articles are written - the layout/structure is what matters for now.
const engineering = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/engineering" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    readingTime: z.string(),
    summary: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { engineering };

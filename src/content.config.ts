import { defineCollection, type ImageFunction } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const markdownPostSchema = ({ image }: { image: ImageFunction }) =>
	z.object({
		title: z.string(),
		description: z.string(),

		noHeader: z.boolean().optional(),

		published: z.date().optional(),
		updated: z.date().optional(),

		previewImage: image().optional(),

		public: z.boolean().optional().default(true),
	});

const markdownPosts = defineCollection({
	loader: glob({
		pattern: "**/[^_]*.{md,mdx}",
		base: "./src/content/markdownPosts",
	}),
	// type: "content",
	schema: markdownPostSchema,
});

export const collections = { markdownPosts };

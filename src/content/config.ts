import { defineCollection, z } from "astro:content";
import { type ImageFunction } from "astro:content";

const markdownPostSchema = ({ image }: { image: ImageFunction }) =>
	z.object({
		title: z.string(),
		description: z.string(),

		noHeader: z.boolean().optional(),

		published: z.date().optional(),
		updated: z.date().optional(),

		previewImage: image().optional(),
		tags: z.array(z.string()).optional(),
	});

const markdownPosts = defineCollection({
	type: "content",
	schema: markdownPostSchema,
});

export const collections = { markdownPosts };

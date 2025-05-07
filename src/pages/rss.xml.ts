import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { compareByPublishDate } from "./blog.astro";

import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

export async function GET(context: { site: string }) {
	const posts = (await getCollection("markdownPosts"))
		.sort((a, b) => compareByPublishDate(a, b))
		.filter((post) => post.data.published)
		.filter((post) => post.data.public);

	return rss({
		title: "weird autumn's blog",
		description: "who up xml-ing they rss",
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.published,
			description: post.data.description,
			content: sanitizeHtml(parser.render(post.body), {
				allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
			}),
			link: `/${post.slug}/`,
		})),
		customData: `<language>en-gb</language>`,
	});
}

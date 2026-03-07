import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdowIt from 'markdown-it';

const parser = new MarkdowIt();

export async function GET(context) {
    const blog = await getCollection('blog');
    return rss({
        title: "Michael Mandic",
        description: "SWE and student at the University of Belgrade",
        site: context.site,
        items: blog.map((post) => ({
            title: post.data.title,
            pubDate: post.data.pubDate,
            description: post.data.description,
            // Compute RSS link from post `id`
            // This example assumes all posts are rendered as `/blog/[id]` routes
            link: `/blog/${post.id}/`,
            content: sanitizeHtml(parser.render(post.body), {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
            }),
        })),
        stylesheet: "/rss/styles.xsl",
    });
}
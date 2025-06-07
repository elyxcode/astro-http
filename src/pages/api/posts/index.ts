import type { APIRoute } from 'astro';

import { getCollection, getEntry } from 'astro:content';

export const prerender = false

export const GET: APIRoute = async ({ params, url} ) => {

    const blogPosts = await getCollection('blog');

    const slug = url.searchParams.get('slug')

    if(!slug) return ResultResponse(blogPosts, 200)

    const entry = await getEntry("blog", slug);
    
    if(!entry) return ResultResponse({ msg: `Post ${slug} not found` }, 404)

    return ResultResponse(entry, 200);
};


const ResultResponse = (content: Object, statusCode: number) => {
    return new Response(JSON.stringify(content), { status: statusCode , headers: { "Content-Type": "application/json" }})
}
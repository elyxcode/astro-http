import type { APIRoute } from 'astro';  
import { getEntry } from 'astro:content';

export const prerender = false

export const GET: APIRoute = async ({ params } ) => {

    const { slug } = params;

    const post = await getEntry('blog', slug as any)

    if(!post) return ResultResponse({ msg: 'not found'}, 404);

    return ResultResponse(post , 200)
};

export const POST: APIRoute = async ({ params, request } ) => {

    const body = await request.json();

    return ResultResponse({ method: 'POST', ...body } , 200)
};

export const PUT: APIRoute = async ({ params, request } ) => {

    const body = await request.json();

    return ResultResponse({ method: 'PUT', ...body } , 200)
};

export const PATCH: APIRoute = async ({ params, request } ) => {

    const body = await request.json();

    return ResultResponse({ method: 'PATCH', ...body } , 200)
};

export const DELETE: APIRoute = async ({ params, request } ) => {

    const { slug } = params;

    return ResultResponse({ method: 'DELETE', slug } , 200)
};


const ResultResponse = (content: Object, statusCode: number) => {
    return new Response(JSON.stringify(content), { status: statusCode , headers: { "Content-Type": "application/json" }})
}
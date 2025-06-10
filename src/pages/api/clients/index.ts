import type { APIRoute } from 'astro';
import { Clients, db } from 'astro:db';

export const prerender = false

export const GET: APIRoute = async ({ params, url} ) => {

    try {
        const users = await db.select().from(Clients);

        const result = {
            users,
            total: users.length
        }

        return ResultResponse(result, 200);    
    } catch (error) {
        return ResultResponse({ msg: "not found" }, 400);    
    }
};

export const POST: APIRoute = async ({ request }) => {

    try {
        
        const {id, ...body} = await request.json();

        const { lastInsertRowid } = await db.insert(Clients).values(body)

        const result = {
            id: lastInsertRowid?.toString(),
            ...body
        }

        return ResultResponse(result, 201);
    
    } catch (error) {
        return ResultResponse({ msg: "Not found"}, 400);    
    }
    
};


const ResultResponse = (content: Object, statusCode: number) => {
    return new Response(JSON.stringify(content), { status: statusCode , headers: { "Content-Type": "application/json" }})
}
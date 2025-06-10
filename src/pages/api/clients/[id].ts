import type { APIRoute } from 'astro';
import { Clients, db, eq } from 'astro:db';

export const prerender = false

export const GET: APIRoute = async ({ params, url} ) => {

    const { id = "" } = params;
    
    const result = await db.select().from(Clients).where(eq(Clients.id, +id))

    if(result.length > 0){
        return ResultResponse(result, 200);
    }

    return ResultResponse({ msg: `Client with id ${id} not found`}, 404);

};

export const PATCH: APIRoute = async ({ params, request} ) => {

    const clientId = params.id ?? "";
    
    try {
            
        const {id, ...body} = await request.json();

        await db.update(Clients).set(body).where(eq(Clients.id, +clientId))

        const updateClient = await db.select().from(Clients).where(eq(Clients.id, +clientId))

        return ResultResponse(updateClient, 200);
        
    } catch (error) {
        return ResultResponse({ msg: "Not found"}, 400);    
    }
};

export const DELETE: APIRoute = async ({ params, url} ) => {

    const { id = "" } = params;

    const { rowsAffected } = await db.delete(Clients).where(eq(Clients.id, +id))

    if(rowsAffected > 0){
        return ResultResponse({ msg: "Deleted" }, 200);

    }

    return ResultResponse({ msg: `Client with id ${id} not found`}, 404);

};


const ResultResponse = (content: Object, statusCode: number) => {
    return new Response(JSON.stringify(content), { status: statusCode , headers: { "Content-Type": "application/json" }})
}
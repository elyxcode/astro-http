import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ params, request }) => {

    const person = {
        name: 'Douglas',
        age: 33
    }

    return new Response(
        JSON.stringify(person), 
        { 
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            } 
        }
    );
};
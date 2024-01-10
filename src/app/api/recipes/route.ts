import dbConnect from '../../../lib/dbInstance';
import RecipeSchema from '../models/Recipe';
import { NextResponse } from 'next/server';
export async function handler(request: Request) {
    const { pathname } = new URL(request.url)
    const { method } = request
    await dbConnect();
    switch (method) {
        case 'GET':
            try {
                const recipes = await RecipeSchema.find()
                return new Response(JSON.stringify(recipes), {
                    headers: { 'content-type': 'application/json' },
                })
            } catch (e) {
                console.error(e);
                return new Response('Recipe search could not be performed.', {
                    status: 404,
                })
            }
        default:
            return new Response('Not found', { status: 404 })
    }
    return NextResponse.json({ });
}

export { handler as GET, handler as POST }
import dbConnect from '../../../../lib/dbInstance';
import RecipeSchema from '../../models/Recipe';
import { NextResponse } from 'next/server';
export async function handler(request: Request, ctx: { params: { recipeId: string } }) {
    await dbConnect();
    try {
        const recipes = await RecipeSchema.findById(ctx.params.recipeId)
        return new Response(JSON.stringify(recipes), {
            headers: { 'content-type': 'application/json' },
        })
    } catch (e) {
        console.error(e);
        return new Response('Recipe search could not be performed.', {
            status: 404,
        })
    }
    return NextResponse.json({ });
}

export { handler as GET }
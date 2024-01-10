import dbConnect from '@/lib/dbInstance';
import { getShoppingList } from '@/lib/openai';
import RecipeSchema from '@/models/Recipe';

export async function handler(request: Request, ctx: { params: { recipeId: string } }) {
    await dbConnect();
    try {
        const recipe = await RecipeSchema.findById(ctx.params.recipeId)
        let shoppingList = await getShoppingList(recipe)
        shoppingList = JSON.parse(shoppingList)
        return Response.json({
            shoppingList
        })
    } catch (e) {
        console.error(e);
        return new Response('Recipe search could not be performed.', {
            status: 404,
        })
    }
}

export { handler as POST }
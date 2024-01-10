import dbConnect from '@/lib/dbInstance';
import { getRecipeSuggestion } from '@/lib/openai';
import RecipeSchema from '@/models/Recipe';

export async function handler(request: Request, ctx: { params: { recipeId: string } }) {
    await dbConnect();
    try {
        const recipe = await RecipeSchema.findById(ctx.params.recipeId)
        const recipes = await RecipeSchema.find({})
        let suggestedRecipes = await getRecipeSuggestion(recipe, recipes)
        suggestedRecipes = JSON.parse(suggestedRecipes)
        if (suggestedRecipes) {
            suggestedRecipes = await RecipeSchema.find({ _id: { $in: suggestedRecipes.suggestedRecipes } })
        }
        return Response.json({
            status: 'success',
            data: suggestedRecipes
        })
    } catch (e) {
        console.error(e);
        return new Response('Recipe search could not be performed.', {
            status: 404,
        })
    }
}

export { handler as GET }
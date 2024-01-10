import dbConnect from '@/lib/dbInstance';
import { getSupplementSuggestion } from '@/lib/openai';
import RecipeSchema from '@/models/Recipe';

export async function handler(request: Request, ctx: { params: { recipeId: string } }) {
    await dbConnect();
    try {
        const recipe = await RecipeSchema.findById(ctx.params.recipeId)
        console.log("🚀 ~ handler ~ ctx.params.recipeId:", ctx.params.recipeId)
        console.log("🚀 ~ handler ~ recipe:", recipe)
        let suggestedSupp = await getSupplementSuggestion(recipe)
        console.log("🚀 ~ handler ~ suggestedSupp:", suggestedSupp)
        suggestedSupp = JSON.parse(suggestedSupp)
        if (suggestedSupp) {
            suggestedSupp = await RecipeSchema.find({ _id: { $in: suggestedSupp.supplements } })
        }
        return Response.json({
            status: 'success',
            data: {
                recipe,
                suggestedSupp
            }
        })
    } catch (e) {
        console.error(e);
        return new Response('Recipe search could not be performed.', {
            status: 404,
        })
    }
}

export { handler as GET }
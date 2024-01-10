import { BaseResp } from "@/types/base";
import api from "./api";
import { Recipe, supplementType } from "@/types/recipe";


export const recipeApi = api.injectEndpoints({
    endpoints: (build) => ({
        getRecipes: build.query<Recipe[], void>({
            query: () => ({
                url: `/recipes`,
                method: "GET",
            })
        }),
        getRecipe: build.query<Recipe, string>({
            query: (id) => ({
                url: `/recipes/${id}`,
                method: "GET",
            })
        }),
        getSuggestions: build.query<{
            data: Recipe[]
        }, string>({
            query: (id) => ({
                url: `/recipes/${id}/suggestions`,
                method: "GET",
            })
        }),
        getRecipeSupplement: build.mutation<supplementType, string>({
            query: (id) => ({
                url: `/recipes/${id}/supplements`,
                method: "POST",
            })
        })
    }),
    overrideExisting: true,
});

export const {
    useGetRecipesQuery,
    useGetRecipeQuery,
    useGetSuggestionsQuery,
    useGetRecipeSupplementMutation
} = recipeApi;

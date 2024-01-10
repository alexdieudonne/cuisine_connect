import api from "./api";
import { Recipe } from "@/types/recipe";


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
        getSuggestions: build.query<Recipe[], string>({
            query: (id) => ({
                url: `/recipes/${id}/suggestions`,
                method: "GET",
            })
        })
    }),
    overrideExisting: true,
});

export const {
    useGetRecipesQuery,
    useGetRecipeQuery,
    useGetSuggestionsQuery,
} = recipeApi;

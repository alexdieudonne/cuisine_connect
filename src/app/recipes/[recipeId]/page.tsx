"use client";

import React from "react";
import Image from "next/image";
import { useGetRecipeQuery } from "@/app/services/recipe";
import { useParams } from "next/navigation";
import { truncate } from "@/lib/utils";
import SuggestRecipe from "@/components/Recipe/SuggestRecipe";
function Recipe() {
  const { recipeId } = useParams<{ recipeId: string }>();
  const {
    data: recipe,
    isLoading,
    error,
    isFetching,
    isSuccess,
    isError,
  } = useGetRecipeQuery(recipeId);

  if (isLoading || !recipe) return <div>Loading...</div>;
  return (
    <div className="flex justify-center flex-col items-center">
      <div className="border w-full h-[450px] rounded-sm overflow-hidden relative">
        <Image
          src={recipe.illustration}
          alt={recipe.title}
          width={420}
          height={420}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="z-3 absolute bottom-0 p-3 w-full bg-black bg-opacity-20	h-full">
          <div className="absolute bottom-3">
            <h3 className="text-white text-xl font-bold">{recipe.title}</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: truncate(recipe.description ?? "", 100),
              }}
              className="text-white text-sm"
            />
            <div className="mt-3">
              <h3 className="text-md font-bold text-white">Ingredients</h3>
              <ul className="mt-2 flex gap-x-2">
                {recipe.ingredients?.map((r, i) => (
                  <li
                    key={r}
                    className="rounded-xl border w-fit text-sm text-white px-2 py-[.5]"
                  >
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <article className="mt-6">
        <h3>{recipe?.title}</h3>
        <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
      </article>
      <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md">
        Suggest suppelement
      </button>
      <SuggestRecipe recipeId={recipeId} />
    </div>
  );
}

export default Recipe;

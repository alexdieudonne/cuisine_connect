"use client";

import React from "react";
import Image from "next/image";
import { useGetRecipeQuery, useGetRecipeSupplementMutation } from "@/app/services/recipe";
import { useParams } from "next/navigation";
import { truncate } from "@/lib/utils";
import SuggestRecipe from "@/components/Recipe/SuggestRecipe";
import { supplementType } from "@/types/recipe";
import { BaseResp } from "@/types/base";
function Recipe() {
  const [supplement, setSupplement] = React.useState<supplementType>();
  const { recipeId } = useParams<{ recipeId: string }>();
  const {
    data: recipe,
    isLoading,
    error,
    isFetching,
    isSuccess,
    isError,
  } = useGetRecipeQuery(recipeId);

  const [mutate, mutationState] = useGetRecipeSupplementMutation();

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
      {
        !supplement && (
          <button className="mt-12 bg-gray-600 text-white px-4 py-2 rounded-md" onClick={
            () => {
              mutate(recipeId)
                .then((res) => {
                  setSupplement(((res as { data: supplementType; }).data) ?? []);
                })
                .catch((err) => {
                  console.log(err);
                });
            }}>
            Suggest supplement
          </button>
        )
      }
      {
        mutationState.isLoading && (
          <div className="mt-6">Loading...</div>
        )
      }
      <div className="flex gap-2 mb-6 mt-12 flex-wrap">
        {supplement?.suggestedSupp.supplements.map((s, i) => (
          <div className="rounded-3xl py-2 px-4 bg-black text-white" key={i}>{s}</div>
        ))}
      </div>
      <SuggestRecipe recipeId={recipeId} />
    </div>
  );
}

export default Recipe;

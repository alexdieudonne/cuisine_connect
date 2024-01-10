"use client";

import React from "react";
import Image from "next/image";
import { useGetRecipeQuery } from "@/app/services/recipe";
import { useParams } from "next/navigation";
import { truncate } from "@/lib/utils";
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

  if (isLoading) return <div>Loading...</div>;
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
            <p dangerouslySetInnerHTML={{
                __html: truncate(recipe.description, 100)
            }} className="text-white text-sm"/>
            <div className="mt-3">
              <h3 className="text-md font-bold text-white">Ingredients</h3>
              <ul className="mt-2 flex gap-x-2">
                <li className="rounded-xl border w-fit text-sm text-white px-2 py-[.5]">
                  Poulet
                </li>
                <li className="rounded-xl border w-fit text-sm text-white px-2 py-[.5]">
                  Poulet
                </li>
                <li className="rounded-xl border w-fit text-sm text-white px-2 py-[.5]">
                  Poulet
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <article className="mt-6">
        <h3>{recipe?.title}</h3>
        <div dangerouslySetInnerHTML={{ __html: recipe.description }} />
      </article>
    </div>
  );
}

export default Recipe;

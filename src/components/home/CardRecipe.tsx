import React, { FC } from "react";
import Image from "next/image";
import { Recipe } from "@/types/recipe";
import { truncate } from "@/lib/utils";

type CardRecipeProps = {
  recipe: Recipe;
};

const CardRecipe: FC<CardRecipeProps> = ({ recipe }) => {
  return (
    <a
      href={`/recipes/${recipe._id}`}
      className="border w-80 h-80 rounded-xl overflow-hidden relative block min-w-[300px]"
    >
      <Image
        src={recipe.illustration}
        alt={recipe.title}
        width={420}
        height={420}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="z-3 absolute bottom-0 p-3 w-full bg-black bg-opacity-70	">
        <h3 className="text-white text-xl font-bold">{recipe.title}</h3>
        <p
          dangerouslySetInnerHTML={{
            __html: truncate(recipe.description, 100),
          }}
          className="text-white text-sm"
        />
      </div>
    </a>
  );
};

export default CardRecipe;

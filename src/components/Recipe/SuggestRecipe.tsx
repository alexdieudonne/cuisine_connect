import { useGetSuggestionsQuery } from "@/app/services/recipe";
import { useParams } from "next/navigation";
import React, { FC } from "react";
import CardRecipe from "../home/CardRecipe";

type SuggestRecipeProps = {
  recipeId: string;
};

const SuggestRecipe: FC<SuggestRecipeProps> = ({ recipeId }) => {
  const {
    data: recipes,
    isLoading,
    error,
    isFetching,
    isSuccess,
    isError,
  } = useGetSuggestionsQuery(recipeId);

  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>Error</div>;
  return (
    <div className="relative block w-full">
      <h2 className="font-bold text-xl mt-6 mb-2">Suggestions</h2>
      <div className="overflow-x-scroll">
        <div className="flex gap-x-2 py-2">
          {recipes?.data?.map((recipe) => {
            return <CardRecipe recipe={recipe} key={recipe._id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SuggestRecipe;

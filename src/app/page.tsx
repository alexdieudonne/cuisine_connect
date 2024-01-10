/* eslint-disable @next/next/no-img-element */
"use client";
import { FC, useEffect, useState } from "react";
import Header from "@/components/Header";
import Image from "next/image";
import CardRecipe from "@/components/home/CardRecipe";
import { useGetRecipesQuery } from "./services/recipe";

const Home: FC<HeaderProps> = (props) => {
  const [direction, updateDirection] = useState<0 | 1 | 2 | 3>(0);
  const [arrowClass, updateArrowClass] = useState("arrow-right");

  const {
    data: recipes,
    isLoading,
    error,
    isFetching,
    isSuccess,
    isError,
  } = useGetRecipesQuery();

  useEffect(() => {
    updateDirection(0);
  }, []);

  useEffect(() => {
    let classes = {
      0: "arrow right",
      1: "arrow down",
      2: "arrow left",
      3: "arrow up",
    };
    updateArrowClass(classes[direction] as string);
  }, [direction]);

  if (isLoading || !recipes) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="flex justify-center gap-8">
          <img
            src="/assets/man-cooking.png"
            alt="logo"
            className="w-2/4 max-w-sm"
          />
          <div className="flex-col flex justify-center text-center max-w-sm gap-3 text-black">
            <h2 className="uppercase text-inter font-medium	text-md text-[#777777]">
              The `No-Recipes` Recipe
            </h2>
            <h3 className="uppercase text-inter font-bold	text-2xl">
              Healthy Recipes that are good for you
            </h3>
            <p className="text-inter text-sm">
              Ruby Goss <span>Senior Food Editor at Abellana Stories</span>
            </p>
          </div>
        </section>
        <section className="bg-gray-200 py-10 px-8 justify-center flex flex-col items-center gap-10">
          <h3 className="uppercase text-inter font-bold	text-2xl text-black">
            Find Recipes and more
          </h3>
          <div>
            <div className="relative text-gray-600 focus-within:text-gray-400">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <button
                  type="submit"
                  className="p-1 focus:outline-none focus:shadow-outline"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    className="w-6 h-6"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </button>
              </span>
              <input
                className="border border-gray-500 min-w-[500px] py-3 outline-none px-11 text-black text-sm"
                placeholder="What's cooking ?"
              />
            </div>
          </div>
        </section>

        <section className="bg-white py-10 px-8 justify-center flex flex-col items-start gap-10">
          <div>
            <h3 className="uppercase text-inter font-bold	text-xl text-black">
              Our recipies
            </h3>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {recipes.map((v, i) => (
                <CardRecipe key={v._id} recipe={v} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;

type HeaderProps = {};

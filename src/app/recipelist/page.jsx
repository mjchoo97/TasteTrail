"use client";

import React from "react";
import styles from "./page.module.css";
import Recipelist from "@/components/recipelist/Recipelist";
import { connect } from "mongoose";
import { connectToDB } from "../../../lib/utils";
import useSWR from "swr";
import AllRecipeSkeleton from "@/components/allrecipeskeleton/AllRecipeSkeleton";
import Pagination from "@/components/pagination/Pagination";

const fetcher = async (url) => {
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("wrong");
  }

  return res.json();
};

//FETCH DATA WITH API
const AllRecipe = ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  const { data, error, isLoading } = useSWR(
    process.env.NEXT_PUBLIC_API_ENDPOINT + `recipelist?page=${page}`,
    fetcher
  );

  return (
    <div className={styles.container}>
      <div className={styles.title}>All Menu</div>
      {isLoading ? (
        <AllRecipeSkeleton />
      ) : (
        <div className={styles.recipelistcontainer}>
          <div className={styles.recipelist}>
            {data.recipes.map((recipe) => (
              <Recipelist key={recipe.id} {...recipe} />
            ))}
          </div>
          <Pagination page={page} count={data.count} />
        </div>
      )}
    </div>
  );
};

export default AllRecipe;

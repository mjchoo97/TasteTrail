"use client";

import React from "react";
import styles from "./page.module.css";
import Recipelist from "@/components/recipelist/Recipelist";
import { connect } from "mongoose";
import { connectToDB } from "../../../lib/utils";
import useSWR from "swr";
import AllRecipeSkeleton from "@/components/allrecipeskeleton/AllRecipeSkeleton";

const fetcher = async (url) => {
  const res = await fetch(url, { next: { revalidate: 10 } });

  if (!res.ok) {
    throw new Error("wrong");
  }

  return res.json();
};

console.log(process.env.NEXT_PUBLIC_API_ENDPOINT + "allrecipe");

//FETCH DATA WITH API
const AllRecipe = () => {
  const { data, error, isLoading } = useSWR(
    process.env.NEXT_PUBLIC_API_ENDPOINT + "allrecipe",
    fetcher
  );

  return (
    <div className={styles.container}>
      <div className={styles.title}>All Menu</div>
      {isLoading ? (
        <AllRecipeSkeleton />
      ) : (
        <div className={styles.recipelist}>
          {data.map((recipe) => (
            <Recipelist key={recipe.id} {...recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllRecipe;

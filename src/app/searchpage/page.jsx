"use client";

import React, { useEffect } from "react";
import styles from "./page.module.css";
import useSWR from "swr";
import { useParams, useSearchParams } from "next/navigation";
import Recipelist from "@/components/recipelist/Recipelist";
import { useRouter } from "next/navigation";
import AllRecipeSkeleton from "@/components/allrecipeskeleton/AllRecipeSkeleton";

const fetcher = async (url) => {
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Error fetching search result");
  }

  return res.json();
};

const SearchPage = () => {
  const searchParams = useSearchParams();
  const searchKey = searchParams.get("search");

  const { data, error, isLoading } = useSWR(
    searchKey
      ? process.env.NEXT_PUBLIC_API_ENDPOINT + `searchpage?search=${searchKey}`
      : null,
    fetcher
  );

  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <div className={styles.container}>
          <div className={styles.title}>Receipe Menu</div>
          <div className={styles.searchText}></div>
          {data.length > 0 ? (
            <div className={styles.recipelist}>
              {data.map((recipe) => (
                <Recipelist key={recipe.id} {...recipe} />
              ))}
            </div>
          ) : (
            <div className={styles.norescontainer}>
              <div className={styles.noresults}>No results found.</div>
              <button onClick={handleClick} className={styles.searchButton}>
                Back to Search
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SearchPage;

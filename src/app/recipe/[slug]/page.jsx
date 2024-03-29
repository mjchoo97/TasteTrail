"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Loadingskeleton from "@/components/loadingskeleton/Loadingskeleton";
import { foodSampleImg } from "../../../../lib/foodsample";
import { revalidatePath } from "next/cache";

const fetcher = async (url) => {
  const res = await fetch(
    url,
    { next: { revalidate: 3600 } },
    {
      method: "GET",
    }
  );
  if (!res.ok) {
    throw new Error("wrong");
  }
  return res.json();
};

const Receipe = ({ params }) => {
  const { slug } = params;
  console.log(slug);

  const [servings, setServings] = useState(1);
  const [imurl, setImurl] = useState("");

  console.log(servings);
  // FETCH DATA WITH API
  const { data, error, isLoading } = useSWR(
    process.env.NEXT_PUBLIC_API_ENDPOINT + `recipe/${slug}`,
    fetcher
  );

  const router = useRouter();

  const handleEdit = () => {
    router.push(`/editrecipe/${slug}`);
  };
  const deleteData = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT + `recipe/${slug}`,
      {
        method: "DELETE",
        body: JSON.stringify({
          id: data._id,
        }),
      }
    );
    if (!res.ok) {
      toast.error("Fail to delete");
      throw new Error("wrong");
    }

    return res.json();
  };
  const handleDelete = () => {
    toast.promise(deleteData(), {
      loading: "Deleting...",
      success: <b>Successfully deleted!</b>,
      error: <b>Could not delete.</b>,
    });

    router.push("/recipelist");
  };

  console.log(imurl);

  useEffect(() => {
    //Runs only on the first render
    const imageurl = foodSampleImg();
    setImurl(imageurl);
  }, []);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Loadingskeleton />
      ) : (
        <>
          <div className={styles.titlecontainer}>
            <div className={styles.foodName}>{data.name}</div>
            <div className={styles.editContainer} onClick={handleEdit}>
              <Image src="/edit.png" alt="" fill className={styles.editpng} />
            </div>
            <div className={styles.editContainer} onClick={handleDelete}>
              <Image src="/bin.png" alt="" fill className={styles.editpng} />
            </div>
          </div>
          <div className={styles.imgWrapper}>
            <div className={styles.imgContainer}>
              <Image src={imurl} alt="" fill className={styles.imgg} />
            </div>
          </div>
          <div className={styles.ingTitle}>Ingredients:</div>
          <div className={styles.ingredientContainer}>
            <div className={styles.adjust}>
              Adjust Servings
              <input
                className={styles.input}
                defaultValue={servings}
                onChange={(e) => {
                  e.target.value != 0
                    ? setServings(e.target.value)
                    : setServings(servings);
                }}
              ></input>
            </div>
            {data.ingredients.map((ing, ind) => {
              return (
                <div key={ind} className={styles.ingWrapper}>
                  <div className={styles.count}>
                    {ing.volume * servings + ` ` + ing.unit}
                  </div>
                  <div className={styles.material}>{ing.ingredient}</div>
                </div>
              );
            })}
          </div>
          <div className={styles.ingTitle}>Instructions:</div>
          <div className={styles.instuContainer}>
            {data.instructions.map((step, index) => {
              return (
                <div key={index} className={styles.instuWrapper}>
                  <div className={styles.steps}>
                    {index + 1}. {step}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Receipe;

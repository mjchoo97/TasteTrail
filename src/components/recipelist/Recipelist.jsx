"use client";

import React, { useEffect, useState } from "react";
import styles from "./recipelist.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { foodSampleImg } from "../../../lib/foodsample";

const Recipelist = (props) => {
  const { category, name, recipeslugs } = props;
  const [imgurl, setimgurl] = useState("");

  const router = useRouter();

  const handleClick = (e) => {
    router.push(`/recipe/${recipeslugs}`);
  };

  useEffect(() => {
    //Runs only on the first render
    const imageurl = foodSampleImg();
    setimgurl(imageurl);
  }, []);

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.imageContainer}>
        <Image
          priority={true}
          src={imgurl}
          className={styles.imgg}
          alt=""
          fill
        />
        <div className={styles.textContainer}>
          <div className={styles.category}>{category.toUpperCase()}</div>
          <div className={styles.name}>{name}</div>
        </div>
      </div>
    </div>
  );
};

export default Recipelist;

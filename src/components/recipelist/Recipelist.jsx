"use client";

import React from "react";
import styles from "./recipelist.module.css";
import Image from "next/image";
import { useRouter } from 'next/navigation'

const Recipelist = (props) => {
  const {category,name,recipeslugs} = props

  const router = useRouter()
  

  const handleClick =(e) =>{
    router.push(`/recipe/${recipeslugs}`)
  }
  
  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.imageContainer}>
        <Image  priority={true}  src="/foodsample.jpg" className ={styles.imgg} alt = "" fill/>
        <div className ={styles.textContainer}>
          <div className = {styles.category}>
            {category.toUpperCase()}
          </div>
          <div className={styles.name}>
            {name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipelist;

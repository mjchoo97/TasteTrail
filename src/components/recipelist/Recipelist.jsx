"use client";

import React from "react";
import styles from "./recipelist.module.css";
import Image from "next/image";
import { useRouter } from 'next/navigation'

const Recipelist = (props) => {
  const {category,name,id} = props

  const router = useRouter()
  

  const handleClick =(e) =>{
    router.push(`/recipe/${id}`)
  }
  console.log(name)
  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.imageContainer}>
        <Image  src="/foodsample.jpg" className ={styles.imgg} alt = "" fill/>
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

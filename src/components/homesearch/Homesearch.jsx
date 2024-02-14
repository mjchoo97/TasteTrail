"use client";

import React from "react";
import styles from "./homesearch.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Searchbar from "../searchbar/Searchbar";

const Homesearch = () => {
  return (
    <div className={styles.container}>
      <div className={styles.hometext}>The best place to find your recipe</div>
      <Searchbar />
    </div>
  );
};

export default Homesearch;

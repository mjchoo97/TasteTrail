import React from "react";
import styles from "./allrecipeskeleton.module.css";

const AllRecipeSkeleton = () => {
  return (
    <div className={styles.skeletoncontainer}>
      <div className={styles.skeletonbox}></div>
      <div className={styles.skeletonbox}></div>
      <div className={styles.skeletonbox}></div>
    </div>
  );
};

export default AllRecipeSkeleton;

import React from "react";
import styles from "./loadingskeleton.module.css";

const Loadingskeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loadingskeleton;

import React from "react";
import styles from "./loading.module.css";

const loading = () => {
  return (
    <div className={styles.container}>
      <div class={styles.loader}></div>
    </div>
  );
};

export default loading;

import React from "react";
import styles from "./loading.module.css";
import Loadingskeleton from "@/components/loadingskeleton/Loadingskeleton";

const loading = () => {
  return (
    <div className={styles.container}>
      <Loadingskeleton />
    </div>
  );
};

export default loading;

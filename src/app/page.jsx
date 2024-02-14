import Homesearch from "@/components/homesearch/Homesearch";
import React from "react";
import styles from "./page.module.css";
import Image from "next/image";

const Home = () => {
  return (
    <div className={styles.container}>
      <Homesearch />
      <div className={styles.welcomecontainer}>
        <div className={styles.welcomeimgcontainer}>
          <Image src="/welcome1.jpg" className={styles.imgg} fill />
          <div className={styles.textcontainer}>
            Discover delightful dishes and culinary inspirations for your next
            feast.
          </div>
        </div>
        <div className={styles.welcomeimgcontainer2}>
          <Image src="/welcome2.jpg" className={styles.imgg} fill />
        </div>
      </div>
    </div>
  );
};

export default Home;

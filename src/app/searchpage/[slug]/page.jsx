import React from "react";
import styles from "./searchpage.module.css";
import Recipelist from "@/components/recipelist/Recipelist";


const testRecipes =[
  {
    "id":"1",
    "name": "Blueberrycake",
    "category": "Main Dish"
  },
  {
    "id":"2",
    "name": "Bread",
    "category": "Dessert"
  }
]

const Searchpage = ({ params }) => {
  const { slug } = params;
  return (
    <div className={styles.container}>
      <div className={styles.searchText}>
        <div>You have searched for {slug.replace("%20", " ")}</div>
      </div>
      <div className={styles.recipelist}>
        {testRecipes.map((recipe) =>
          <Recipelist {...recipe}/>
        )}
      </div>
    </div>
  );
};

export default Searchpage;

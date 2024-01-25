import React from 'react'
import styles from './page.module.css'
import Recipelist from '@/components/recipelist/Recipelist';

const AllRecipe = () => {
    const testRecipes = [
        {
            "id": "1",
            "name": "Blueberrycake",
            "category": "Dessert"
        },
        {
            "id": "2",
            "name": "Bread",
            "category": "Side Dish"
        },
        {
            "id": "3",
            "name": "Spaghetti Carbonara",
            "category": "Main Dish"
        },
        {
            "id": "4",
            "name": "Caesar Salad",
            "category": "Appetizer"
        },
        {
            "id": "5",
            "name": "Chicken Curry",
            "category": "Main Dish"
        },
        {
            "id": "6",
            "name": "Chocolate Chip Cookies",
            "category": "Dessert"
        },
        {
            "id": "7",
            "name": "Mushroom Risotto",
            "category": "Main Dish"
        }
    ];
    


    return (
        <div className={styles.container}>
          <div className = {styles.title}>
            All Menu
          </div>
          <div className={styles.recipelist}>
            {testRecipes.map((recipe) =>
              <Recipelist key={recipe.id} {...recipe}/>
            )}
          </div>
        </div>
      );
}

export default AllRecipe
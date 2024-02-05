"use server";

import { Recipe } from "./models";
import { connectToDB } from "./utils";

export const addRecipe = async (recipeData) =>{

    try{

        connectToDB()

        const newRecipe = new Recipe(recipeData)

        const addRecipe =await newRecipe.save()
        console.log("saved to db")


    }catch(err){
        console.log(err)

    }

}
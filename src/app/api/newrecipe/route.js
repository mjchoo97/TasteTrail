import { NextResponse } from "next/server"
import { Recipe } from "../../../../lib/models"
import { connectToDB } from "../../../../lib/utils"

export const POST = async (req) =>{
    try{

        await connectToDB();
        const body = await req.json()
        const newRecipe = new Recipe(body)   

        const addRecipe = await newRecipe.save()
        console.log("saved to db")
        return new NextResponse(
            JSON.stringify({status:"200"})
        )


    }catch(err){
        console.log(err)
        throw new Error("Failed to insert recipe into DB")
    }
}
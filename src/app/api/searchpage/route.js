import { NextResponse } from "next/server";
import { Recipe } from "../../../../lib/models";
import { connectToDB } from "../../../../lib/utils";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const searchWord = searchParams.get("search");

  const query = {
    recipeslugs: { $regex: new RegExp(`.*${searchWord}.*`, "i") },
  };

  try {
    await connectToDB(); // Assuming connectToDB is an asynchronous operation, make sure to await it
    const recipes = await Recipe.find(query);
    console.log(recipes);
    return NextResponse.json(recipes); // Corrected the response object
  } catch (err) {
    console.error(err); // Changed console.log to console.error for better visibility of errors
    throw new Error("Failed to fetch recipes");
  }
};

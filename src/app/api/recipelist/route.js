import { NextResponse } from "next/server";
import { Recipe } from "../../../../lib/models";
import { connectToDB } from "../../../../lib/utils";

export const GET = async (req) => {
  console.log(req.url);
  try {
    await connectToDB(); // Assuming connectToDB is an asynchronous operation, make sure to await it
    const recipes = await Recipe.find();
    return NextResponse.json(recipes); // Corrected the response object
  } catch (err) {
    console.error(err); // Changed console.log to console.error for better visibility of errors
    throw new Error("Failed to fetch recipes");
  }
};

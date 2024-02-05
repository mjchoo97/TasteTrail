import { NextResponse } from "next/server";
import { Recipe } from "../../../../lib/models";
import { connectToDB } from "../../../../lib/utils";

export const GET = async (req) => {
  //   const body = await req.json();
  try {
    connectToDB();
    const recipes = await Recipe.find();
    console.log(recipes);
    return new NextResponse.json(recipes, { status: "200" });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch recipes");
  }
};

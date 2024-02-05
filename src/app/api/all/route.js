import { NextResponse } from "next/server";
import { Recipe } from "../../../../lib/models";
import { connectToDB } from "../../../../lib/utils";

export const GET = async (request) => {
  try {
    // connectToDB();
    // const recipes = await Recipe.find();
    // console.log(recipes)
    // return NextResponse.json(recipes);
    return NextResponse.json(JSON.stringify({ status: "200" }));
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch recipes");
  }
};

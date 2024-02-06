import { NextResponse } from "next/server";
import { Recipe } from "../../../../../lib/models";
import { connectToDB } from "../../../../../lib/utils";

export const GET = async (request, { params }) => {
  const { slugs } = params;
  console.log(slugs);

  try {
    connectToDB();

    const recipe = await Recipe.findOne({ recipeslugs: slugs });

    if (!recipe) {
      return NextResponse.error("Recipe not found", 404);
    }
    console.log(recipe);
    return NextResponse.json(recipe);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch recipes");
  }
};

export const DELETE = async (req) => {
  try {
    connectToDB();
    const body = await req.json();
    const deleterecipe = await Recipe.findByIdAndDelete(body.id);

    return NextResponse.json(JSON.stringify({ status: "200" }));
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete");
  }
};

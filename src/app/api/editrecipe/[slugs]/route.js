import { NextResponse } from "next/server";
import { Recipe } from "../../../../../lib/models";
import { connectToDB } from "../../../../../lib/utils";

export const PUT = async (req) => {
  try {
    await connectToDB();
    const body = await req.json();
    // const updatedRecipe = new Recipe(body);
    const { id, ...others } = body;

    const updateRecipe = await Recipe.findByIdAndUpdate(
      { _id: id },
      { ...others }
    );
    console.log(id);
    console.log({ ...others });
    console.log("updated item to db");
    return new NextResponse(JSON.stringify({ status: "200" }));
  } catch (err) {
    console.log(err);
    throw new Error("Failed to insert recipe into DB");
  }
};

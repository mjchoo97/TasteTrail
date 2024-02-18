import { NextResponse } from "next/server";
import { Recipe } from "../../../../lib/models";
import { connectToDB } from "../../../../lib/utils";

export const GET = async (req) => {
  const POST_PER_PAGE = 6;

  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  console.log(page);

  console.log(req.url);

  try {
    await connectToDB(); // Assuming connectToDB is an asynchronous operation, make sure to await it
    // const recipes = await Recipe.find()
    //   .skip(POST_PER_PAGE * (page - 1))
    //   .limit(POST_PER_PAGE);
    const [recipes, count] = await Promise.all([
      Recipe.find()
        .skip(POST_PER_PAGE * (page - 1))
        .limit(POST_PER_PAGE),
      Recipe.countDocuments(),
    ]);
    console.log(recipes);
    return NextResponse.json({ recipes, count }); // Corrected the response object
  } catch (err) {
    console.error(err); // Changed console.log to console.error for better visibility of errors
    throw new Error("Failed to fetch recipes");
  }
};

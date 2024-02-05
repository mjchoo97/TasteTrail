const { default: mongoose } = require("mongoose");

const ingredientSchema = new mongoose.Schema(
  {
    volume: { type: String, required: true },
    unit: { type: String, required: true },
    ingredient: { type: String, required: true },
  },
  { _id: false }
);

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
      unique: false,
    },
    ingredients: {
      type: [ingredientSchema],
      required: true,
    },
    instructions: {
      type: [String],
      required: true,
    },
    recipeslugs: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Recipe =
  mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema);

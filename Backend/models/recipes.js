import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const recipeSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, "User is required"],
  },
  recipeName: {
    type: String,
    required: [true, "Recipe name is required"],
  },
  prepTime: {
    type: String,
    required: [true, "Preparation time is required"],
  },
  cookTime: {
    type: String,
    required: [true, "Cook time is required"],
  },
  servings: {
    type: String,
    required: [true, "Servings count is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  coverImage: {
    type: String,
    required: [true, "Cover image is required"],
  },
  recipeImage: {
    type: String,
    required: [true, "Recipe image is required"],
  },
  ingredients: [
    {
      id: {
        type: String,
        required: [true, "Ingredient ID is required"],
      },
      value: {
        type: String,
        required: [true, "Ingredient value is required"],
      },
    },
  ],
  steps: [
    {
      id: {
        type: String,
        required: [true, "Step ID is required"],
      },
      value: {
        type: String,
        required: [true, "Step value is required"],
      },
    },
  ],
  tags: [
    {
      type: String,
      required: [true, "At least one tag is required"],
    },
  ],
});

const recipeModel = mongoose.model("recipe", recipeSchema);

recipeModel.getAllRecipes = async (successCallback, errorCallback) => {
  try {
    const dbRes = await recipeModel.find();
    console.log("GET | dbRes is: ", dbRes);
    successCallback(dbRes);
  } catch(dbErr) {
    console.error("GET | dbErr is: ", dbErr.Error);
    errorCallback(dbErr);
  }
};

recipeModel.getRecipesByUser = async (email, successCallback, errorCallback) => {
  try {
    const recipes = await recipeModel.find({ user: email });
    successCallback(recipes);
  } catch (err) {
    errorCallback(err);
  }
};

recipeModel.getRecipeById = async (id, successCallback, errorCallback) => {
  try {
    const recipe = await recipeModel.findById(id);
    successCallback(recipe);
  } catch (err) {
    errorCallback(err);
  }
};

recipeModel.addRecipe = async (recipe, successCallback, errorCallback) => {
  try {
    // Transform `ingredients` to include `id` and `value`
    recipe.ingredients = recipe.ingredients.map((ingredient) => ({
      id: uuidv4(), // Generate a unique ID for each ingredient
      value: ingredient, // Use the string directly as the `value`
    }));

    // Transform `steps` to include `id` and `value`
    recipe.steps = recipe.steps.map((step) => ({
      id: uuidv4(), // Generate a unique ID for each step
      value: step, // Use the string directly as the `value`
    }));

    // Create the recipe in the database
    const dbRes = await recipeModel.create(recipe);
    console.log("Post | dbRes is: ", dbRes);
    successCallback(dbRes);
  } catch (dbErr) {
    console.error("Post | dbErr is: ", dbErr);
    errorCallback(dbErr);
  }
};


recipeModel.editRecipe = async (id, recipe, successCallback, errorCallback) => {
  try {
    const updatedRecipe = await recipeModel.findByIdAndUpdate(id, { $set: recipe }, { new: true });
    console.log("EDIT | Recipe updated:", updatedRecipe);
    successCallback(updatedRecipe);
  } catch (error) {
    console.error("EDIT | Error:", error);
    errorCallback({ message: "Error editing recipe", error });
  }
};


recipeModel.deleteRecipe = async (id, successCallback, errorCallback) => {
  try {
    const dbRes = await recipeModel.findByIdAndDelete(id);
    console.log("Delete | dbRes is: ", dbRes);
    successCallback(dbRes);
  } catch (dbErr) {
    console.error("Delete | dbErr is: ", dbErr.Error);
    errorCallback(dbErr);
  }
};

export default recipeModel;
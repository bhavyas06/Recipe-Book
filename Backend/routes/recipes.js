import express from "express";
import fs from "fs";

const router = express.Router();

router.get("/", (req, res) => {
  const userEmail = req.query.user;
  let fileData;

  try {
    fileData = fs.readFileSync("./db.json", { encoding: "utf-8" });
    const allRecipes = JSON.parse(fileData)?.recipes || [];

    if (userEmail) {
      const userRecipes = allRecipes.filter(recipe => recipe.user === userEmail);
      return res.status(200).send(userRecipes);
    }

    res.status(200).send(allRecipes);
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch recipes", message: err.message });
  }
});

router.get("/user/:email", (req, res) => {
  const userEmail = req.params.email;
  let fileData;

  try {
    fileData = fs.readFileSync("./db.json", { encoding: "utf-8" });
    const allRecipes = JSON.parse(fileData)?.recipes || [];
    const userRecipes = allRecipes.filter(recipe => recipe.user === userEmail);

    if (userRecipes.length > 0) {
      res.status(200).send(userRecipes);
    } else {
      res.status(404).send({ message: "No recipes found for the user" });
    }
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch recipes", message: err.message });
  }
});

router.get("/:id", (req, res) => {
  const recipeId = req.params.id;
  let fileData;

  try {
    fileData = fs.readFileSync("./db.json", { encoding: "utf-8" });
    const recipes = JSON.parse(fileData)?.recipes || [];
    const recipe = recipes.find(item => item.id === recipeId);

    if (recipe) {
      res.status(200).send(recipe);
    } else {
      res.status(404).send({ message: "Recipe not found" });
    }
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch recipe", message: err.message });
  }
});

router.post("/", (req, res) => {
  const recipe = req.body;
  let db;

  try {
    db = fs.readFileSync("./db.json", { encoding: "utf-8" });
    const dbParsed = JSON.parse(db);
    const currentRecipes = dbParsed.recipes || [];
    const updatedRecipes = [...currentRecipes, recipe];
    const updatedDb = JSON.stringify({ ...dbParsed, recipes: updatedRecipes });

    fs.writeFileSync("./db.json", updatedDb);
    res.status(201).send({ message: "Recipe added successfully", recipe });
  } catch (err) {
    res.status(500).send({ error: "Failed to add recipe", message: err.message });
  }
});

router.put("/:id", (req, res) => {
  const recipeId = req.params.id;
  const updatedRecipe = req.body;
  let db;

  try {
    db = fs.readFileSync("./db.json", { encoding: "utf-8" });
    const dbParsed = JSON.parse(db);
    const recipes = dbParsed.recipes || [];
    const recipeIndex = recipes.findIndex(item => item.id === recipeId);

    if (recipeIndex === -1) {
      return res.status(404).send({ message: "Recipe not found" });
    }

    recipes[recipeIndex] = { ...recipes[recipeIndex], ...updatedRecipe };
    fs.writeFileSync("./db.json", JSON.stringify({ ...dbParsed, recipes }));

    res.status(200).send({ message: "Recipe updated successfully", recipe: recipes[recipeIndex] });
  } catch (err) {
    res.status(500).send({ error: "Failed to update recipe", message: err.message });
  }
});

router.delete("/:id", (req, res) => {
  const recipeId = req.params.id;
  let db;

  try {
    db = fs.readFileSync("./db.json", { encoding: "utf-8" });
    const dbParsed = JSON.parse(db);
    const recipes = dbParsed.recipes || [];
    const updatedRecipes = recipes.filter(item => item.id !== recipeId);

    if (recipes.length === updatedRecipes.length) {
      return res.status(404).send({ message: "Recipe not found" });
    }

    fs.writeFileSync("./db.json", JSON.stringify({ ...dbParsed, recipes: updatedRecipes }));
    res.status(200).send({ message: "Recipe deleted successfully" });
  } catch (err) {
    res.status(500).send({ error: "Failed to delete recipe", message: err.message });
  }
});

export default router;
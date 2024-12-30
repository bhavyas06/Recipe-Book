import express from "express";
import recipeModel from "../models/recipes.js";

const router = express.Router();

router.get("/", (req, res) => {
  recipeModel.getAllRecipes(
    (dbRes) => {
      if (dbRes) {
        res.send(dbRes);
      } else {
        res.status(204);
        res.send(dbRes);
      }
    },
    (dbErr) => {
      console.log(dbErr.name);
      res.status(500);
      res.send({ error: dbErr.message });
    }
  );
});

router.get("/user/:email", (req, res) => {
  const userEmail = req.params.email;
  // let fileData;

  // try {
  //   fileData = fs.readFileSync("./db.json", { encoding: "utf-8" });
  //   const allRecipes = JSON.parse(fileData)?.recipes || [];
  //   const userRecipes = allRecipes.filter(recipe => recipe.user === userEmail);

  //   if (userRecipes.length > 0) {
  //     res.status(200).send(userRecipes);
  //   } else {
  //     res.status(404).send({ message: "No recipes found for the user" });
  //   }
  // } catch (err) {
  //   res.status(500).send({ error: "Failed to fetch recipes", message: err.message });
  // }

  if (userEmail) {
    recipeModel.getRecipesByUser(userEmail, (dbRes) => {
      if (dbRes) {
        res.send(dbRes);
      } else {
        res.status(204);
        res.send(dbRes);
      }
    },
      (dbErr) => {
        console.log(dbErr.name);
        res.status(500);
        res.send({ error: dbErr.message });
      }
    );
  }
});

router.get("/:id", (req, res) => {
  const recipeId = req.params.id;
  // let fileData;

  // try {
  //   fileData = fs.readFileSync("./db.json", { encoding: "utf-8" });
  //   const recipes = JSON.parse(fileData)?.recipes || [];
  //   const recipe = recipes.find(item => item.id === recipeId);

  //   if (recipe) {
  //     res.status(200).send(recipe);
  //   } else {
  //     res.status(404).send({ message: "Recipe not found" });
  //   }
  // } catch (err) {
  //   res.status(500).send({ error: "Failed to fetch recipe", message: err.message });
  // }

  recipeModel.getRecipeById(id, (dbRes) => {
    if (dbRes) {
      res.send(dbRes);
    } else {
      res.status(204);
      res.send(dbRes);
    }
  }, (dbErr) => {
    console.log(dbErr.name);
    res.status(500);
    res.send({ error: dbErr.message });
  });
});

router.post("/", (req, res) => {
  const recipe = req.body;
  console.log("Incoming Recipe Data:", recipe);
  recipeModel.addRecipe(recipe, (dbRes) => {
    if (dbRes) {
      res.send(dbRes);
    } else {
      res.status(204);
      res.send(dbRes);
    }
  }, (dbErr) => {
    console.log(dbErr.name);
    res.status(500);
    res.send({ error: dbErr.message });
  });
});

router.put("/:id", (req, res) => {
  const recipeId = req.params.id;
  const updatedRecipe = req.body;

  recipeModel.editRecipe(recipeId, updatedRecipe, (dbRes) => {
    if (dbRes) {
      res.send(dbRes);
    } else {
      res.status(204);
      res.send(dbRes);
    }
  }, (dbErr) => {
    console.log(dbErr.name);
    res.status(500);
    res.send({ error: dbErr.message });
  });
});

router.delete("/:id", (req, res) => {
  const recipeId = req.params.id;
  recipeModel.deleteRecipe(recipeId, (dbRes) => {
    if (dbRes) {
      res.send(dbRes);
    } else {
      res.status(204);
      res.send(dbRes);
    }
  }, (dbErr) => {
    console.log(dbErr.name);
    res.status(500);
    res.send({ error: dbErr.message });
  });
});

export default router;
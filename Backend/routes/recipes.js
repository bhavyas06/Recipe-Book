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

router.get("/random-recipes", async (req, res) => {
  try {
    const count = parseInt(req.query.count) || 3; 
    const recipes = await recipeModel.aggregate([{ $sample: { size: count } }]);
    res.send(recipes);
  } catch (error) {
    console.error("Error fetching random recipes:", error);
    res.status(500).send({ error: "Unable to fetch random recipes" });
  }
});

router.get("/user/:email", (req, res) => {
  const userEmail = req.params.email;

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

  recipeModel.getRecipeById(recipeId, (dbRes) => {
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
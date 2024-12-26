import express from "express";
import userRoutes from "./routes/users.js";
import recipeRoutes from "./routes/recipes.js"


const app = express();
const port = 8080;

app.use(express.json());

app.use("/users", userRoutes);
app.use("/recipes", recipeRoutes);


app.get("/", (req, res) => {
  res.send("Hello World");
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

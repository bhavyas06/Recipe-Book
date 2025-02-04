import express from "express";
import userRoutes from "./routes/users.js";
import recipeRoutes from "./routes/recipes.js"
import "./config/dbConnection.js";
import cors from "cors";

const app = express();
const port = 8080;

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", 'auth-token'],
};

app.use(cors(corsOptions));


app.use("/users", userRoutes);
app.use("/recipes", recipeRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});


app.listen(8081, () => {
    console.log(`Server running on http://localhost:8081`);
});

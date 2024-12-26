import React from "react";
import { Link } from "react-router-dom";
import { RecipeBox } from "../elements/RecipeBox";
import "./index.css";

const tags = [
  { name: "Breakfast", image: "images/Parantha.webp" },
  { name: "Lunch", image: "images/Rajma.jpg" },
  { name: "Dinner", image: "images/Malai_Kofta.jpg" },
  { name: "Snacks", image: "images/Samosa.webp" },
  { name: "Dessert", image: "images/GulabJamun.jpeg" },
  { name: "Breads", image: "images/Naan.jpeg" },
  { name: "Italian", image: "images/Italian.jpg" },
  { name: "Non Veg", image: "images/Chicken.jpg" },
];

const Recipes = () => {
  return (
    <>
      <h2 style={{ color: "#178F7A", fontSize: "40px" }}>Browse Recipe Categories</h2>
      <div className="tag-container">
        {tags.map((tag) => (
          <Link
            to={`/recipes/tags/${tag.name.toLowerCase()}`}
            key={tag.name}
            className="tag-card"
          >
            <div className="tag-card" key={tag.name}>
              <RecipeBox title={tag.name} image={tag.image} />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Recipes;

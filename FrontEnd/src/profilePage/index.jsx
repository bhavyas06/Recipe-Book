import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

export function ProfilePage({onLogout}) {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    onLogout();
    navigate("/");
  };

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const response = await fetch(
          `http://localhost:5174/recipes?user=${loggedInUser.email}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchUserRecipes();
  }, [loggedInUser]);

  const handleEdit = (recipe) => {
    navigate("/addRecipe", { state: { recipe, isEdit: true } });
};

  const handleView = (recipeId) => {
    navigate(`/recipes/${recipeId}`);
  };

  const handleDelete = async (recipeId) => {
    if(window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        const response = await fetch(`http://localhost:5174/recipes/${recipeId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
        });

        if(!response.ok) {
          throw new Error("Failed to delete recipe");
        }
        const result = await response.json();
        alert(response.message || "Recipe deleted successfully");
        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe.id !== recipeId)
        );
      } 
      catch (error) {
        console.error("Error deleting recipe:", error);
        alert("Error deleting recipe");
      }
    }
  }

  return (
    <div className="profile-page">
      <h1>Welcome, {loggedInUser.name}</h1>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      <h2>Your Recipes</h2>
      <div className="recipe-list">
        {recipes.length === 0 ? (
          <p>No recipes added yet. Start by adding one!</p>
        ) : (
          recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="recipe-card"
              onClick={() => handleView(recipe.id)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={recipe.coverImage}
                alt={recipe.recipeName}
                className="recipe-card-img"
              />
              <div className="recipe-card-content">
                <h3>{recipe.recipeName}</h3>
                <div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(recipe);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Delete clicked for recipe:", recipe.id);
                      handleDelete(recipe.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

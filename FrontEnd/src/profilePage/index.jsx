import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

export function ProfilePage() {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  // If the user is not logged in, redirect to login page
  if (!loggedInUser) {
    navigate("/");
    return null;
  }

  const authToken = loggedInUser.token;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    localStorage.removeItem("email");
    localStorage.setItem("isLoggedIn", "false");
    navigate("/"); // Redirect to login page
    window.location.reload();
  };

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/recipes/user/${loggedInUser.email}`,
          {
            headers: {
              "auth-token": authToken,
            },
          }
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
  }, [loggedInUser, authToken]);

  const handleEdit = (recipe) => {
    navigate("/addRecipe", { state: { recipe, isEdit: true } });
  };

  const handleView = (recipeId) => {
    navigate(`/recipes/${recipeId}`);
  };

  const handleDelete = async (recipeId) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        const response = await fetch(`http://localhost:8080/recipes/${recipeId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete recipe");
        }

        alert("Recipe deleted successfully");
        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe._id !== recipeId)
        );
      } catch (error) {
        console.error("Error deleting recipe:", error);
        alert("Error deleting recipe");
      }
    }
  };

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
              key={recipe._id}
              className="recipe-card"
              onClick={() => handleView(recipe._id)}
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
                      handleDelete(recipe._id);
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
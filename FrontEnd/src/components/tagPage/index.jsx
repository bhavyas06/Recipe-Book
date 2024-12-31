import { useParams, Link } from "react-router-dom"; 
import { useEffect, useState } from "react"; 
import { RecipeBox } from "../elements/RecipeBox";

export function TagPage() { 
  const { tag } = useParams(); // Get the dynamic tag from URL 
  const [recipes, setRecipes] = useState([]); 
  const [loading, setLoading] = useState(true); // Add loading state 
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchRecipesByTag = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch(
          `http://localhost:8080/recipes?tags_like=${tag.toLowerCase()}` // Filter by tag
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch recipes: ${response.status}`);
        }
        const data = await response.json();

        // Debugging: log data and tag
        console.log("Fetched Recipes:", data);
        console.log("Tag from URL:", tag);

        // Filter recipes that contain the tag (case insensitive)
        const filteredRecipes = data.filter(recipe => 
          recipe.tags && recipe.tags.some(t => t.toLowerCase() === tag.toLowerCase())
        );
        
        console.log("Filtered Recipes:", filteredRecipes); //Debugging filter result
        console.log(filteredRecipes[0].id);
        
        setRecipes(filteredRecipes); // Set the fetched recipes
      } catch (err) {
        setError(err.message); // Capture any errors
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchRecipesByTag();
  }, [tag]);

  return (
    <div>
      <h2>{tag.charAt(0).toUpperCase() + tag.slice(1)} Recipes</h2>
      {loading && <p>Loading recipes...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <div
          className="recipe-cards-container"
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        >
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <Link key={recipe._id} to={`/recipes/${recipe._id}`}>
                <RecipeBox
                  title={recipe.recipeName}
                  image={recipe.coverImage}
                />
              </Link>
            ))
          ) : (
            <p>No recipes found for this tag.</p>
          )}
        </div>
      )}
    </div>
  );
}

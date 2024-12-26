import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './index.css';

export function RecipeInnerPage() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeById = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5174/recipes/${recipeId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch recipe: ${response.status}`);
        }
        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeById();
  }, [recipeId]);

  if (loading) return <div className="spinner">Loading recipe...</div>;
  if (error) return <p>Error: {error}</p>;
  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <div className="recipe-inner-page">
      <section id="recipe-temp">
        <div className="img-hold">
          <img src={recipe.recipeImage} alt={recipe.recipeName} />
        </div>
      </section>

      <section id="prep">
        <div className="prep-con">
          <p className="p1">
            <span className="pp">Prep:</span> {recipe.prepTime} ||{" "}
            <span className="pp">Cook:</span> {recipe.cookTime} ||{" "}
            <span className="pp">Serves:</span> {recipe.servings}
          </p>
          <p className="p1">{recipe.description}</p>
        </div>
      </section>

      <div className="ingredients-method">
        <div className="ingredients">
          <p className="section-title">Ingredients:</p>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index}>
              <input type="checkbox" id={`ingredient-${index}`} />
              <label htmlFor={`ingredient-${index}`}>{ingredient.value}</label>
            </div>
          ))}
        </div>

        <div className="method">
          <p className="section-title">Method:</p>
          {recipe.steps.map((step, index) => (
            <div key={index}>
              <p className="step">Step {index + 1}</p>
              <p className="desc">{step.value}</p>
            </div>
          ))}
        </div>
      </div>


      <section id="tags">
        <div className="t">
          <p>Tags: </p>
          {recipe.tags.map((tag, index) => (
            <a href={`/recipes/tags/${tag}`} key={index}>
              <button>{tag}</button>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

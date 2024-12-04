import React, { useState } from "react";
import "./index.css";

const AddRecipe = () => {
    const [recipeName, setRecipeName] = useState("");
    const [prepTime, setPrepTime] = useState("");
    const [cookTime, setCookTime] = useState("");
    const [servings, setServings] = useState("");
    const [description, setDescription] = useState("");

    const [ingredients, setIngredients] = useState(
        Array.from({ length: 5 }, (_, index) => ({
            id: Date.now() + index,
            value: "",
        }))
    );
    const [steps, setSteps] = useState(
        Array.from({ length: 5 }, (_, index) => ({
            id: Date.now() + index + 5,
            value: "",
        }))
    );
    const [tags, setTags] = useState({
        breakfast: false,
        dinner: false,
        lunch: false,
        snacks: false,
        "non veg": false,
        breads: false,
        dessert: false,
        italian: false,
    });

    const [coverImage, setCoverImage] = useState(null);
    const [recipeImage, setRecipeImage] = useState(null);

    const removeImage = (setImage, inputId) => {
        setImage(null);
        const input = document.getElementById(inputId);
        input.value = ""; 
    };
    

    const handleImageChange = (e, setImage) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleAddIngredient = () =>
        setIngredients([...ingredients, { id: Date.now(), value: "" }]);

    const handleAddStep = () =>
        setSteps([...steps, { id: Date.now(), value: "" }]);

    const handleIngredientChange = (id, value) => {
        setIngredients((prev) =>
            prev.map((item) => (item.id === id ? { ...item, value } : item))
        );
    };

    const handleStepChange = (id, value) => {
        setSteps((prev) =>
            prev.map((item) => (item.id === id ? { ...item, value } : item))
        );
    };

    const handleRemoveIngredient = (id) =>
        setIngredients((prev) => prev.filter((item) => item.id !== id));

    const handleRemoveStep = (id) =>
        setSteps((prev) => prev.filter((item) => item.id !== id));

    const handleTagChange = (tag) => {
        setTags((prev) => ({ ...prev, [tag]: !prev[tag] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formattedIngredients = ingredients
            .map((item) => item.value.trim())
            .filter(Boolean);
        const formattedSteps = steps
            .map((item) => item.value.trim())
            .filter(Boolean);
        const selectedTags = Object.keys(tags).filter((tag) => tags[tag]);

        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

        if (
            !formattedIngredients.length ||
            !formattedSteps.length ||
            !coverImage ||
            !recipeImage ||
            !selectedTags.length ||
            !loggedInUser ||
            !recipeName ||
            !description ||
            !prepTime ||
            !cookTime ||
            !servings
        ) {
            alert("Please fill out all fields, select tags, upload an image, and make sure you're logged in!");
            return;
        }

        const recipe = {
            id: Date.now().toString(),
            user: loggedInUser.email,
            recipeName,
            coverImage,
            recipeImage,
            prepTime,
            cookTime,
            description,
            servings,
            ingredients: formattedIngredients,
            steps: formattedSteps,
            tags: selectedTags,
        };

        const existingRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
        existingRecipes.push(recipe);

        localStorage.setItem("recipes", JSON.stringify(existingRecipes));
        alert("Recipe saved successfully!");

        // Clear the form after saving
        setRecipeName("");
        setPrepTime("");
        setCookTime("");
        setServings("");
        setDescription("");
        setIngredients(
            Array.from({ length: 5 }, (_, index) => ({
                id: Date.now() + index,
                value: "",
            }))
        );
        setSteps(
            Array.from({ length: 5 }, (_, index) => ({
                id: Date.now() + index + 5,
                value: "",
            }))
        );
        setCoverImage(null);
        setRecipeImage(null);
        setTags({
            breakfast: false,
            dinner: false,
            lunch: false,
            snacks: false,
            "non veg": false,
            breads: false,
            dessert: false,
            italian: false,
        });
    };

    return (
        <form className="add-recipe-form" onSubmit={handleSubmit} autoComplete="off">
            <h2>Add Recipe</h2>

            {/* Recipe Name */}
            <div className="name">
                <label htmlFor="recipe-name">
                    <h3>Recipe Name:</h3>
                </label>
                <input
                    type="text"
                    id="recipe-name"
                    value={recipeName || ""}
                    onChange={(e) => setRecipeName(e.target.value)}
                    placeholder="Enter Recipe Name"
                />
            </div>

            {/* Cover Image */}
<div className="image-upload-container">
    <div className="image-upload">
        <label htmlFor="coverImageInput" className="upload-label">
            {coverImage ? (
                <img src={coverImage} alt="Cover" className="uploaded-image" />
            ) : (
                <span>Select Cover Image</span>
            )}
        </label>
        <input
            type="file"
            id="coverImageInput"
            accept="image/*"
            onChange={(e) => handleImageChange(e, setCoverImage)} // Trigger image update
            style={{ display: "none" }}
        />
        {coverImage && (
            <button
                type="button"
                className="remove-button"
                onClick={(e) => {
                    e.stopPropagation();
                    removeImage(setCoverImage, "coverImageInput"); // Reset file input and image preview
                }}
            >
                ✕
            </button>
        )}
    </div>

{/* Recipe Image */}
    <div className="image-upload">
        <label htmlFor="recipeImageInput" className="upload-label">
            {recipeImage ? (
                <img src={recipeImage} alt="Recipe" className="uploaded-image" />
            ) : (
                <span>Select Recipe Image</span>
            )}
        </label>
        <input
            type="file"
            id="recipeImageInput"
            accept="image/*"
            onChange={(e) => handleImageChange(e, setRecipeImage)} // Trigger image update
            style={{ display: "none" }}
        />
        {recipeImage && (
            <button
                type="button"
                className="remove-button"
                onClick={(e) => {
                    e.stopPropagation();
                    removeImage(setRecipeImage, "recipeImageInput"); // Reset file input and image preview
                }}
            >
                ✕
            </button>
        )}
    </div>
</div>



            {/* Recipe Details */}
            <div className="details">
                <div className="time">
                    <label htmlFor="prep-time">Prep Time:</label>
                    <input
                        type="text"
                        id="prep-time"
                        value={prepTime || ""}
                        onChange={(e) => setPrepTime(e.target.value)}
                        placeholder="Enter prep time"
                    />
                </div>
                <div className="time">
                    <label htmlFor="cook-time">Cook Time:</label>
                    <input
                        type="text"
                        id="cook-time"
                        value={cookTime || ""}
                        onChange={(e) => setCookTime(e.target.value)}
                        placeholder="Enter cook time"
                    />
                </div>
                <div className="time">
                    <label htmlFor="servings">Servings:</label>
                    <input
                        type="number"
                        id="servings"
                        value={servings || ""}
                        onChange={(e) => setServings(e.target.value)}
                        placeholder="Enter servings"
                    />
                </div>
                <div className="time">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description || ""}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description"
                    />
                </div>
            </div>

            {/* Ingredients Section */}
            <div className="recipe-container">
                <div className="ingredients">
                    <h3>Ingredients</h3>
                    {ingredients.map((ingredient) => (
                        <div key={ingredient.id} className="input-group">
                            <textarea
                                value={ingredient.value}
                                onChange={(e) => handleIngredientChange(ingredient.id, e.target.value)}
                                placeholder="Enter an ingredient"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveIngredient(ingredient.id)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddIngredient}
                        className="add-button"
                        style={{ backgroundColor: "#75C2B1" }}
                    >
                        + Add Ingredient
                    </button>
                </div>

                {/* Steps Section */}
                <div className="steps">
                    <h3>Steps</h3>
                    {steps.map((step) => (
                        <div key={step.id} className="input-group">
                            <textarea
                                value={step.value}
                                onChange={(e) => handleStepChange(step.id, e.target.value)}
                                placeholder="Enter a step"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveStep(step.id)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddStep}
                        className="add-button"
                        style={{ backgroundColor: "#75C2B1" }}
                    >
                        + Add Step
                    </button>
                </div>
            </div>

            {/* Tags Section */}
            <div className="tags1">
                <h3>Tags:</h3>
                <div className="tag-label">
                    {Object.keys(tags).map((tag) => (
                        <label key={tag}>
                            <input
                                type="checkbox"
                                checked={tags[tag]}
                                onChange={() => handleTagChange(tag)}
                            />
                            {tag}
                        </label>
                    ))}
                </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-button">
                Submit Recipe
            </button>
        </form >
    );

};

export default AddRecipe;
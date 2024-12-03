import React, { useState } from "react";
import "./index.css";

const AddRecipe = () => {
    const [recipeName, setRecipeName] = useState(null);
    const [prepTime, setPrepTime] = useState(null);
    const [cookTime, setCookTime] = useState(null);
    const [servings, setServings] = useState(null);
    const [description, setDescription] = useState(null);

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
    const [image, setImage] = useState(null);
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

    const removeImage = (setImage) => {
        setImage(null);
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

        // Retrieve the logged-in user from localStorage
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

        // Debugging: Log values to check what's going on
        console.log("Ingredients:", formattedIngredients);
        console.log("Steps:", formattedSteps);
        console.log("Selected Tags:", selectedTags);
        console.log("Logged In User:", loggedInUser);

        if (
            !formattedIngredients.length ||
            !formattedSteps.length ||
            !coverImage || !recipeImage ||
            !selectedTags.length ||
            !loggedInUser || !recipeName || 
            !description || !prepTime || !cookTime
        ) {
            alert("Please fill out all fields, select tags, upload an image, and make sure you're logged in!");
            return;
        }

        const recipe = {
            user: loggedInUser.email,
            recipeName: recipeName,
            cI: coverImage,
            rI: recipeImage,
            prepTime,
            cookTime,
            description,
            ingredients: formattedIngredients,
            steps: formattedSteps,
            tags: selectedTags,
        };

        console.log("Submitting Recipe:", recipe);

        // Save to Local Storage
        const localStorageKey = "recipes";
        const existingRecipes =
            JSON.parse(localStorage.getItem(localStorageKey)) || {};

        selectedTags.forEach((tag) => {
            if (!existingRecipes[tag]) existingRecipes[tag] = [];
            existingRecipes[tag].push(recipe);
        });

        localStorage.setItem(localStorageKey, JSON.stringify(existingRecipes));
        console.log("Updated Recipes in Local Storage:", existingRecipes);

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
        coverImage(null);
        recipeImage(null);
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
        <form className="add-recipe-form" onSubmit={handleSubmit}>
            <h2>Add Recipe</h2>

            <div className="name">
                <label htmlFor="recipe-name" className="recipe-name">
                    <h3>Recipe Name:</h3>
                </label>
                <input
                    type="text"
                    id="recipeName"
                    placeholder="Enter Recipe Name"
                />
            </div>

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
                        onChange={(e) => handleImageChange(e, setCoverImage)}
                        style={{ display: "none" }}
                    />
                    {coverImage && (
                        <button
                            type="button"
                            className="remove-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                removeImage(setCoverImage);
                            }}
                        >
                            ✕
                        </button>
                    )}
                </div>

                {/* Recipe Image Section */}
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
                        onChange={(e) => handleImageChange(e, setRecipeImage)}
                        style={{ display: "none" }}
                    />
                    {recipeImage && (
                        <button
                            type="button"
                            className="remove-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                removeImage(setRecipeImage);
                            }}
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {/* Recipe Details (Ingredients, Steps, Tags, etc.) */}
            <div className="details">
                <div className="time">
                    <label htmlFor="prep-time" className="prepTime">Prep Time</label>
                    <input type="text" placeholder="Enter prep time" id="prep-time" />
                </div>
                <div className="time">
                    <label htmlFor="cook-time" className="cookTime">Cooking Time</label>
                    <input type="text" placeholder="Enter cooking time" id="cook-time" />
                </div>
                <div className="time">
                    <label htmlFor="servings" className="serve">Servings</label>
                    <input type="number" placeholder="Enter servings" id="servings" />
                </div>
                <div className="time">
                    <label htmlFor="description" className="descr">Description</label>
                    <textarea type="text" placeholder="Enter description" id="description" />
                </div>
            </div>

            {/* Ingredients, Steps, Tags Section */}
            <div className="recipe-container">
                <div className="ingredients">
                    <h3>Ingredients</h3>
                    {ingredients.map((ingredient) => (
                        <div key={ingredient.id} className="input-group">
                            <textarea
                                value={ingredient.value}
                                onChange={(e) =>
                                    handleIngredientChange(ingredient.id, e.target.value)
                                }
                                placeholder="Enter an ingredient"
                                aria-label="Ingredient"
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
                        style={{ backgroundColor: "#75C2B1" }}
                    >
                        + Add Ingredient
                    </button>
                </div>

                <div className="steps">
                    <h3>Steps</h3>
                    {steps.map((step) => (
                        <div key={step.id} className="input-group">
                            <textarea
                                value={step.value}
                                onChange={(e) => handleStepChange(step.id, e.target.value)}
                                placeholder="Enter a step"
                                aria-label="Step"
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
                        style={{ backgroundColor: "#75C2B1" }}
                    >
                        + Add Step
                    </button>
                </div>

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
            </div>

            {/* Submit Button */}
            <button type="submit" style={{ backgroundColor: "#00796b" }}>
                Submit Recipe
            </button>
        </form>
    );
};

export default AddRecipe;
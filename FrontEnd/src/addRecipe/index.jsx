import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./index.css";

const AddRecipe = () => {
    const {state} = useLocation();
    const {recipe, isEdit} = state || {};
    const navigate = useNavigate();

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

    useEffect(() => {
        if (isEdit && recipe) {
            setRecipeName(recipe.recipeName || "");
            setPrepTime(recipe.prepTime || "");
            setCookTime(recipe.cookTime || "");
            setServings(recipe.servings || "");
            setDescription(recipe.description || "");
            setIngredients(recipe.ingredients || []);
            setSteps(recipe.steps || []);
            setTags((prevTags) => {
                const updatedTags = { ...prevTags };
                recipe.tags.forEach((tag) => {
                    updatedTags[tag] = true;
                });
                return updatedTags;
            });
            setCoverImage(recipe.coverImage || null);
            setRecipeImage(recipe.recipeImage || null);
        }
    }, [isEdit, recipe]);

    const removeImage = (setImage, inputId) => {
        setImage(null);
        const input = document.getElementById(inputId);
        input.value = ""; 
    };
    

    const handleImageChange = (e, setImage) => {
        const file = e.target.files[0];
        if (file) {
            const imagePath = `/images/${file.name}`;
            setImage(imagePath);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        console.log(loggedInUser);

        const selectedTags = Object.keys(tags).filter((tag) => tags[tag]);
        const formattedIngredients = ingredients.filter(Boolean);
        const formattedSteps = steps.filter(Boolean);

        if (
            !loggedInUser ||
            !recipeName ||
            !prepTime ||
            !cookTime ||
            !servings ||
            !description ||
            !coverImage ||
            !recipeImage ||
            !formattedIngredients.length ||
            !formattedSteps.length ||
            !selectedTags.length
        ) {
            alert("Please fill out all fields, select tags, and upload images!");
            return;
        }

        const newRecipe = {
            id: isEdit ? recipe.id : Date.now().toString(),
            user: loggedInUser.email,
            recipeName,
            prepTime,
            cookTime,
            servings,
            description,
            coverImage,
            recipeImage,
            ingredients: formattedIngredients,
            steps: formattedSteps,
            tags: selectedTags,
        };

        console.log(newRecipe);

        const url = isEdit
        ? `http://localhost:5174/recipes/${recipe.id}`
        : "http://localhost:5174/recipes";

        try {
            const response = await fetch(url, {
                method: isEdit? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newRecipe),
            });

            if (!response.ok) {
                throw new Error("Failed to submit recipe.");
            }

            alert(isEdit ? "Recipe updated successfully!" : "Recipe added successfully!");
            if(isEdit) 
                navigate("/profile");
            resetForm();
        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
        }
    };

    const resetForm = () => {
        setRecipeName("");
        setPrepTime("");
        setCookTime("");
        setServings("");
        setDescription("");
        setIngredients(Array(5).fill(""));
        setSteps(Array(5).fill(""));
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
        setCoverImage(null);
        setRecipeImage(null);
    };
    
    

    return (
        <form className="add-recipe-form" onSubmit={handleSubmit} autoComplete="off">
            <h2>{isEdit ? "Edit Recipe" : "Add Recipe"}</h2>

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
                    removeImage(setCoverImage, "coverImageInput");
                }}
            >
                ✕
            </button>
        )}
    </div>

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
                    removeImage(setRecipeImage, "recipeImageInput");
                }}
            >
                ✕
            </button>
        )}
    </div>
</div>


            <div className="details1">
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

            <button type="submit" className="submit-button">
                {isEdit ? "Save Recipe" : "Submit Recipe"}
            </button>
        </form >
    );

};

export default AddRecipe;
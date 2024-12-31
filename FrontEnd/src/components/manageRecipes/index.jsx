import { useEffect, useRef, useState } from "react";
// import { PageTitle } from "../elements/pagetitle";
import { useLocation } from "react-router-dom";

export function ManageProduct({ type = "add" }) {
    // type can be add or edit
    const routerData = useLocation();
  
    // const productName = useRef(null);
    // const productPrice = useRef(null);
  
    const [selectedRecipe, setSelectedRecipe] = useState({});
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showFailureAlert, setShowFailureAlert] = useState(false);
  
    const [RecipeName, setRecipeName] = useState(
      type === "add" ? "" : selectedRecipe?.RecipeName
    );
    const [productPrice, setProductPrice] = useState(
      type === "add" ? "" : selectedRecipe?.RecipePrice
    );
}  
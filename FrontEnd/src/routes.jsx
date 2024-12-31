// import { Layout } from "./layout.jsx";
// import { AboutUs } from "./components/aboutUs/index.jsx";
// import { ContactUs } from "./components/contactUs/index.jsx";
// import  AddRecipe from "./components/addRecipe/index.jsx"
// import Recipes from "./components/recipePage/index.jsx"
// import { TagPage } from "./components/tagPage/index.jsx";
// import { RecipeInnerPage } from "./components/recipeInnerPage/index.jsx";
// import { ProfilePage } from "./components/profilePage/index.jsx";
// import { HomePage } from "./components/home/index.jsx";
// import { PrivateRoute } from "./util/helper.jsx";

// export const routes = [
//   {
//     path: "/",
//     element: <Layout></Layout>,
//     children: [
//       {
//         path: "/",
//         element: <HomePage></HomePage>
//       },
//       {
//         path: "/recipes",
//         element: <Recipes></Recipes>
//       },
//       {
//         path: "/recipes/tags/:tag",
//         element: <TagPage></TagPage>
//       },
//       { 
//         path: "/recipes/:recipeId",
//         element: <RecipeInnerPage></RecipeInnerPage>
//       },
//       {
//         path: "/aboutUs",
//         element: <AboutUs></AboutUs>
//       },
//       {
//         path: "/contactUs",
//         element: <ContactUs></ContactUs>
//       },
//       {
//         path: "/addRecipe",
//         element: <PrivateRoute isLoggedIn={true} element={AddRecipe} />
//       },
//       {
//         path: "/profile",
//         element: <PrivateRoute isLoggedIn={true} element={ProfilePage} />
//       }
//     ],
//   },
// ];

import { Layout } from "./layout.jsx";
import { AboutUs } from "./components/aboutUs/index.jsx";
import { ContactUs } from "./components/contactUs/index.jsx";
import AddRecipe from "./components/addRecipe/index.jsx";
import Recipes from "./components/recipePage/index.jsx";
import { TagPage } from "./components/tagPage/index.jsx";
import { RecipeInnerPage } from "./components/recipeInnerPage/index.jsx";
import { ProfilePage } from "./components/profilePage/index.jsx";
import { HomePage } from "./components/home/index.jsx";
import { PrivateRoute } from "./util/helper.jsx";

export const routes = [
  {
    path: "/",
    element: <Layout />, // Main Layout component
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/recipes",
        element: <Recipes />
      },
      {
        path: "/recipes/tags/:tag",
        element: <TagPage />
      },
      {
        path: "/recipes/:recipeId",
        element: <RecipeInnerPage />
      },
      {
        path: "/aboutUs",
        element: <AboutUs />
      },
      {
        path: "/contactUs",
        element: <ContactUs />
      },
      {
        path: "/addRecipe",
        element: <PrivateRoute element={AddRecipe} /> // Protected route
      },
      {
        path: "/profile",
        element: <PrivateRoute element={ProfilePage} /> // Protected route
      }
    ],
  },
];

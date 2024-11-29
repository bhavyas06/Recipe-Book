import { Layout } from "./layout.jsx";
// import { AboutUs } from "./components/aboutUs/index.jsx";
// import AddRecipe from "./components/addRecipe/index.jsx"

export const routes = [
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/aboutUs",
        element: <AboutUs></AboutUs>
      },
      {
        path: "/addRecipe",
        element: <AddRecipe></AddRecipe>
      }
    ],
  },
];
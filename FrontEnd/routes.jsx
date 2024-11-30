import { SignUp } from "./components/signup/index.jsx";
import { Layout } from "./layout.jsx";
import { AboutUs } from "./components/aboutUs/index.jsx";
import { ContactUs } from "./components/contactUs/index.jsx";
import  AddRecipe from "./components/addRecipe/index.jsx"

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
        path: "/contactUs",
        element: <ContactUs></ContactUs>
      },
      {
        path: "/addRecipe",
        element: <AddRecipe></AddRecipe>
      }
    ],
  },
];
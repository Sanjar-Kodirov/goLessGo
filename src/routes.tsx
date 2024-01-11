import { createBrowserRouter, Link } from "react-router-dom";
import { AboutPageAsync } from "./pages/AboutPage/AboutPage.async";
import { MainPageAsync } from "./pages/MainPage/MainPage.async";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPageAsync />,
  },
  {
    path: "about",
    element: <AboutPageAsync />,
  },
]);

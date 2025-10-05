import { createBrowserRouter } from "react-router-dom";
import SearchPage from "../pages/SearchPage";
import DetailsPage from "../pages/DetailsPage";

export const router = createBrowserRouter([
  { path: "/", element: <SearchPage /> },
  { path: "/movie/:id", element: <DetailsPage /> },
]);

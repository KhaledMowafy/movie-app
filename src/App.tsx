import { RouterProvider } from "react-router-dom";
import { router } from "./presentation/router/routes";
import "./presentation/styles/index.css"; // <-- must exist
export default function App() { return <RouterProvider router={router} />; }

import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Picker from "./pages/Picker";
import SavedSets from "./pages/SavedSets";
import Layout from "./layouts/Layout";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "picker/:type", element: <Picker /> },
      { path: "saved", element: <SavedSets /> },
    ],
    errorElement: <NotFound />,
  },
  { path: "*", element: <Navigate to="/" /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

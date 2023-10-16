import { createBrowserRouter } from "react-router-dom";
import SearchPage from "./SearchPage";
import FavoriteReposPage from "./FavoriteReposPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchPage />,
  },

  {
    path: "/favorite",
    element: <FavoriteReposPage />,
  },
]);

export { router };

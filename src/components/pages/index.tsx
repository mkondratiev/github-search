import { createBrowserRouter } from "react-router-dom";
import SearchPage from "./searchPage";
import FavoriteReposPage from "./favoriteReposPage";

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

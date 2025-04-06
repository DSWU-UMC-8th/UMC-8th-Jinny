import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import MoviePage from "./pages/MoviePage";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import MovieDetailPage from "./pages/MovieDetailPage";

// BrowserRouter v5
// createBrowserRouter v6

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFound />,
    children: [
      {
        path: "movies/:category",
        element: <MoviePage />,
      },
      {
        path: "movie/:movieId",
        element: <MovieDetailPage />,
      },
    ],
  },
]);

// movies/upcoming
// movies/popular
// movies/now_playing
// movies/top_rated
// movies?category=popular
// movies/category/{movie_id}

function App() {
  return <RouterProvider router={router} />;
}

export default App;

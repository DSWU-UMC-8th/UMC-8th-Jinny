import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import MoviePage from "./pages/MoviePage";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import MovieDetailPage from "./pages/MovieDetailPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignupPage";
import HomeLayout from "./layouts/HomeLayout";

// BrowserRouter v5
// createBrowserRouter v6

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "movies/:category",
        element: <MoviePage />,
      },
      {
        path: "movie/:movieId",
        element: <MovieDetailPage />,
      },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignUpPage /> },
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

import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";
import "./App.css";
import MoviePage from "./pages/MoviePage";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import MovieDetailPage from "./pages/MovieDetailPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignupPage";
import HomeLayout from "./layouts/HomeLayout";
import MyPage from "./pages/MyPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedLayout from "./layouts/ProtectedLayout";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";

// BrowserRouter v5
// createBrowserRouter v6

// publicRoutes : 인증 없이 접근 가능한 라우트
const publicRoutes: RouteObject[] = [
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
      { path: "/v1/auth/google/callback", element: <GoogleLoginRedirectPage /> },
    ],
  },
];

// protectedRoutes: 인증이 필요한 라우트
const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "mypage",
        element: <MyPage />,
      },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

// movies/upcoming
// movies/popular
// movies/now_playing
// movies/top_rated
// movies?category=popular
// movies/category/{movie_id}

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;

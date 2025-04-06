import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound";
import MoviesPage from "./pages/MoviesPage";
import RootLayout from "./layout/root-layout.tsx";
import HomePage from "./pages/HomePage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true, // "/" 경로를 의미미
        element: <HomePage />,
      },
      {
        path: "movies/:movieId", // "/:"을 활용하여, 동적으로 바뀌는 부분의 이름 정의
        element: <MoviesPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

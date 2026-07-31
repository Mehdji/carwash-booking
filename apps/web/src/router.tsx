/**
 * Application router configuration using React Router v6.
 * 
 * Defines the routing structure for the application with the following routes:
 * - "/" - Landing page (home route)
 * - "/login" - User login page
 * 
 * @constant {Router} router - The configured browser router instance
 */
import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/landing-page";
import Login from "./pages/login/login";
import Dashboard from "./pages/dashboard/dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,

  },
  {
    path: "/login",
    element: <Login />,

  }, {
    path: "/dashboard",
    element: <Dashboard />,
  }
]);


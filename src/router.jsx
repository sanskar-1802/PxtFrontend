import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ResetPassword from "./pages/Auth/ResetPassword";

import Home from "./pages/Home";           // <-- NEW
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Transactions from "./pages/Transactions/Transactions";
import Budgets from "./pages/Budgets/Budgets";
import Goals from "./pages/Goals/Goals";
import Notifications from "./pages/Notifications/Notifications";
import NotFound from "./pages/NotFound/NotFound";

const router = createBrowserRouter([
  // HOME PAGE
  {
    path: "/",
    element: <Home />,
  },

  // MAIN APP (Protected Area)
  {
    path: "/app",
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "transactions", element: <Transactions /> },
      { path: "budgets", element: <Budgets /> },
      { path: "goals", element: <Goals /> },
      { path: "notifications", element: <Notifications /> },
    ],
  },

  // AUTH ROUTES
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },

  // NOT FOUND
  { path: "*", element: <NotFound /> },

  //reset-password
  { path: "/reset-password/:token", element: <ResetPassword /> },

]);



export default router;

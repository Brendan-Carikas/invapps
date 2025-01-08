import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Layouts
import FullLayout from "../layouts/FullLayout/FullLayout.js";
import AuthLayout from "../layouts/AuthLayout/AuthLayout.js";

// Pages
import Dashboard1 from "../views/dashboards/Dashboard1.js";
import MyBilling from "../views/my-billing/MyBilling";
import BillDetails from "../views/my-billing/BillDetails";
import Settings from "../views/Settings/Settings.js";
import LoginSelector from "../views/auth/LoginSelector.js";
import ModernLogin from "../views/auth/ModernLogin.js";
import Signup from "../views/auth/Signup.js";
import InvotraAdmin from "../views/admin/InvotraAdmin";
import MyAccount from "../views/my-account/MyAccount";

// Protected Route Component
const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/modern-login" state={{ from: location }} replace />;
  }

  return children;
};

const ThemeRoutes = [
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "modern-login", element: <ModernLogin /> },
      { path: "signup", element: <Signup /> },
      { path: "", element: <Navigate to="/modern-login" /> },
      { path: "*", element: <Navigate to="/modern-login" /> },
    ],
  },
  {
    path: "/app",
    element: <PrivateRoute><FullLayout /></PrivateRoute>,
    children: [
      { path: "", element: <Navigate to="/app/dashboards/dashboard1" /> },
      { path: "dashboards/dashboard1", element: <Dashboard1 /> },
      { path: "my-billing", element: <MyBilling /> },
      { path: "my-billing/:billId", element: <BillDetails /> },
      { path: "settings", element: <Settings /> },
      { path: "admin", element: <InvotraAdmin /> },
    ],
  },
  {
    path: "/my-account",
    element: <PrivateRoute><FullLayout /></PrivateRoute>,
    children: [
      { path: "", element: <Navigate to="/my-account/profile" /> },
      { path: "profile", element: <MyAccount /> },
    ],
  },
];

export default ThemeRoutes;

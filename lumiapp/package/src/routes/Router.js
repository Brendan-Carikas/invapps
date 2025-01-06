import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout/FullLayout.js"));
const AuthLayout = lazy(() => import("../layouts/AuthLayout/AuthLayout.js"));
/****End Layouts*****/

/*****Pages******/
const Dashboard1 = lazy(() => import("../views/dashboards/Dashboard1.js"));
const Billing = lazy(() => import("../views/billing/Billing.js"));
const Login = lazy(() => import("../views/auth/Login.js"));
const ModernLogin = lazy(() => import("../views/auth/ModernLogin.js"));
const LoginSelector = lazy(() => import("../views/auth/LoginSelector.js"));
const Signup = lazy(() => import("../views/auth/Signup.js"));
const Settings = lazy(() => import("../views/Settings/Settings.js"));
const MyBilling = lazy(() => import("../views/my-billing/MyBilling"));
const BillDetails = lazy(() => import("../views/my-billing/BillDetails"));
const InvotraAdmin = lazy(() => import("../views/admin/InvotraAdmin"));
const MyAccount = lazy(() => import("../views/my-account/MyAccount"));

const ThemeRoutes = [
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginSelector /> },
      { path: "modern-login", element: <ModernLogin /> },
      { path: "signup", element: <Signup /> },
      { path: "", element: <Navigate to="login" /> },
    ],
  },
  {
    path: "/app",
    element: <FullLayout />,
    children: [
      { path: "", element: <Navigate to="dashboards/dashboard1" /> },
      { path: "dashboards/dashboard1", element: <Dashboard1 /> },
      { path: "billing", element: <Billing /> },
      { path: "my-billing", element: <MyBilling /> },
      { path: "my-billing/:billId", element: <BillDetails /> },
      {
        path: "settings",
        element: <Settings />,
      },
      { path: "admin", element: <InvotraAdmin /> },
    ],
  },
  {
    path: "/my-account",
    element: <FullLayout />,
    children: [
      { path: "", element: <Navigate to="profile" /> },
      { path: "profile", element: <MyAccount /> },
    ],
  },
];

export default ThemeRoutes;

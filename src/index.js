import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./views/Home";
import Activities from "./views/Activities";
import Search from "./views/Search";
import Login from "./views/Login";
import Activitydetail from "./views/Activitydetail";
import Calendar from "./views/Calendar";
import Activity from "./views/Activity";
import TokenProvider from "./context/TokenProvider";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/activities",
        element: <Activities />,
      },
      {
        path: "/activitydetail/:id",
        element: <Activitydetail />,
      },
      {
        path: "/calendar",
        element: <Calendar />,
      },

      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/activity",
        element: (
          <ProtectedRoute>
            <Activity />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TokenProvider>
      <RouterProvider router={router} />
    </TokenProvider>
  </React.StrictMode>
);

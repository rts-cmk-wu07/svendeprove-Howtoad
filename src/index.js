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
import NotFound from "./views/NotFound";

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
        path: "/aktiviteter",
        element: <Activities />,
      },
      {
        path: "/aktivitetsdetaljer/:id",
        element: <Activitydetail />,
      },
      {
        path: "/kalender",
        element: <Calendar />,
      },

      {
        path: "/søg",
        element: <Search />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/activity/:id",
        element: (
          <ProtectedRoute>
            <Activity />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
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

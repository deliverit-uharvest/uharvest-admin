import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import Customer from "../../features/customer/Index";
import Product from "../../features/product/Index";
import Profile from "../../features/account/Index";
import RequireAuth from "./RequireAuth";
import DashboardLayout from "../layout/Dashboard";
import AuthLayout from "../layout/Auth";
import Root from "../layout/Root";
import CategoryPage from "../../features/catalogCategory"; // 
import AddCategory from "../../features/addcategory";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            element: <RequireAuth />,
            children: [
              { path: "customer", element: <Customer /> },
              { path: "product", element: <Product /> },
              { path: "profile", element: <Profile /> },

             

              {
                path: "catalog",
                children: [
                  { path: "category", element: <CategoryPage /> },
                 
                ],
              },
              { path: "addcategory", element: <AddCategory /> }, // /category/add
            ],
            
          },

          { path: "not-found", element: <NotFound /> },
          { path: "server-error", element: <ServerError /> },
          { path: "*", element: <Navigate replace to="/not-found" /> },
        ],
      },
      { path: "login", element: <AuthLayout /> },
    ],
  },
];

export const router = createBrowserRouter(routes);

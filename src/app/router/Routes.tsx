import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import Customer from "../../features/customer/Index";
import Profile from "../../features/account/Index";
import RequireAuth from "./RequireAuth";
import DashboardLayout from "../layout/Dashboard";
import AuthLayout from "../layout/Auth";
import Root from "../layout/Root";
import CategoryPage from "../../features/catalogCategory"; //
import AddCategory from "../../features/addcategory";
import UpdateCategory from "../../features/updateCategory";
import ProductList from "../../features/product/productList";
import AddProduct from "../../features/product/addproduct";
import AddOrganisation from "../../features/addOrganisation";
import OrderManagement from "../../features/orderManagement";
import OrganisationList from "../../features/organisationOnboard/OrganisationList";
import SubCategoryList from "../../features/subCategory";
import AddSubCategory from "../../features/subCategory/Addsubcategory";
<<<<<<< Updated upstream
import UpdateProduct from "../../features/addProduct/updateProduct";
import DashboardHome from "../../features/dashboard";
=======
import UpdateProduct from "../../features/product/updateProduct";
>>>>>>> Stashed changes

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
              { path: "dashboard", element: <DashboardHome /> },
              { path: "customer", element: <Customer /> },
              { path: "profile", element: <Profile /> },
              {
                path: "catalog",
                children: [
                  {
                    path: "category",
                    children: [
                      { index: true, element: <CategoryPage /> },
                      { path: "add", element: <AddCategory /> },
                      { path: ":id", element: <UpdateCategory /> },
                    ],
                  },
                  {
                    path: "subcategory",
                    children: [
                      { index: true, element: <SubCategoryList /> },
                      { path: "add", element: <AddSubCategory /> },
                      // { path: "update/:id", element: <UpdateProduct /> },
                    ],
                  },

                  {
                    path: "product",
                    children: [
                      { index: true, element: <ProductList /> },
                      { path: "add", element: <AddProduct /> },
                      { path: "update/:id", element: <UpdateProduct /> },
                    ],
                  },
                ],
              },

              //

              {
                path: "Orders",
                children: [{ index: true, element: <OrderManagement /> }],
              },
              {
                path: "organisation",
                children: [
                  { index: true, element: <OrganisationList /> },
                  { path: "add", element: <AddOrganisation /> },
                ],
              },
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

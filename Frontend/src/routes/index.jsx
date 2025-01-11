import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyOTP from "../pages/VerifyOTP";
import ResetPassword from "../pages/ResetPassword";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import MyOrders from "../pages/MyOrders";
import SavedAddress from "../pages/SavedAddress";
import UpdateAvatar from "../pages/UpdateAvatar";
import Category from "../pages/Category";
import SubCategory from "../pages/SubCategory";
import UploadProduct from "../pages/UploadProduct";
import Product from "../pages/Product";
import AdminControl from "../components/AdminControl";
import ProductListPage from "../pages/ProductListPage";
import ProductInfoDisplay from "../pages/ProductInfoDisplay";
import CategoryProductDisplay from "../pages/CategoryProductDisplay";
import CheckoutPage from "../pages/CheckoutPage";
import SuccessfulOrder from "../pages/SuccessfulOrder";
import CancelOrder from "../pages/CancelOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/verify-otp",
        element: <VerifyOTP />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "/dashboard/profile",
            element: <Profile />,
          },
          {
            path: "/dashboard/orders",
            element: <MyOrders />,
          },
          {
            path: "/dashboard/address",
            element: <SavedAddress />,
          },
          {
            path: "/dashboard/update-avatar",
            element: <UpdateAvatar />,
          },
          {
            path: "/dashboard/category",
            element: (
              <AdminControl>
                <Category />
              </AdminControl>
            ),
          },
          {
            path: "/dashboard/sub-category",
            element: (
              <AdminControl>
                <SubCategory />
              </AdminControl>
            ),
          },
          {
            path: "/dashboard/upload-product",
            element: (
              <AdminControl>
                <UploadProduct />
              </AdminControl>
            ),
          },
          {
            path: "/dashboard/product",
            element: (
              <AdminControl>
                <Product />
              </AdminControl>
            ),
          },
        ],
      },
      // {
      //   path: "/dc",
      //   children: [
      //     {
      //       path: "/id",
      //       element: <CategoryProductDisplay />,
      //     },
      //   ],
      // },
      {
        path: ":category",
        children: [
          {
            path: ":SubCategory",
            element: <ProductListPage />,
          },
        ],
      },
      {
        path: "/product",
        children: [
          {
            path: ":productInfo",
            element: <ProductInfoDisplay />,
          },
        ],
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/success",
        element: <SuccessfulOrder />,
      },
      {
        path: "/cancel",
        element: <CancelOrder />,
      },
    ],
  },
]);

export default router;

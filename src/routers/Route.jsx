import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/shared/Layout";
import Login from "../pages/shared/form/LoginForm";
import NotFound from "../components/common/NotFound";
import Register from "../pages/shared/form/RegisterForm";
import Home from "../pages/shared/Home";
import Product from "../pages/product/ProductsTable";
import PrivateRoute from "../routers/PrivateRoute";
import ProductUserView from "../pages/customer/ProductUserView";
import ProductDetailsPage from "../pages/customer/ProductDetailsPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "product",
        element: <Product />,
      },
      {
        path: "/ProductUserView",
        element: <ProductUserView />,
      },
      {
        path: "/ProductUserView/:id",
        element: <ProductDetailsPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;

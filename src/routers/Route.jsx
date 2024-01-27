import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Dashboard/Layout";
import LoginAndRegisterForm from "../pages/shared/form/LoginAndRegisterForm";
import NotFound from "../components/common/NotFound";
import HomeDashboard from "../pages/Dashboard/HomeDashboard";
import ProductTable from "../pages/Dashboard/ProductsTable";
import OrderTable from "../pages/Dashboard/OrderTable";
import CategoryTable from "../pages/Dashboard/CategoryTable";
import PrivateRoute from "../routers/PrivateRoute";
import SettingUsers from "../pages/customer/SettingUsers";
// import ProductUserView from "../pages/customer/ProductUserView";
// import ProductDetailsPage from "../pages/customer/ProductDetailsPage";
import HomePage from "../pages/shared/HomePage";
import Cart from "../pages/shared/Cart";
import HomeUser from "../pages/shared/HomeUser";
import CartUser from "../pages/shared/CartUser";
import Checkout from "../components/common/Checkout";
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
        element: <HomeDashboard />,
      },
      {
        path: "/product-list",
        element: <ProductTable />,
      },
      {
        path: "/order-list",
        element: <OrderTable />,
      },
      ,
      {
        path: "/category-list",
        element: <CategoryTable />,
      },
      {
        path: "/setting-Profile",
        element: <SettingUsers />,
      },
      {
        path: "/dashboard",
        element: <HomeDashboard />,
      },
      {
        path: "/user/home",
        element: <HomeUser />,
      },
      {
        path: "/user/cart",
        element: <CartUser />,
      },
      {
        path: "/user/checkout",
        element: <Checkout />,
      },

      // {
      //   path: "/ProductUserView",
      //   element: <ProductUserView />,
      // },
      // {
      //   path: "/ProductUserView/:id",
      //   element: <ProductDetailsPage />,
      // },
    ],
  },
  {
    path: "/LoginAndRegisterForm",
    element: <LoginAndRegisterForm />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
]);

export default router;

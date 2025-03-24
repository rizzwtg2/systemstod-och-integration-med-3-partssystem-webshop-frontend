import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";
import { SingleProduct } from "./components/products/SingleProduct";
import { SingleCustomer } from "./components/customers/SingleCustomer";
import { CustomerPage } from "./pages/CustomerPage";
import { OrderPage } from "./pages/OrderPage";
import { SingleOrder } from "./components/orders/SingleOrder";
import { AdminLayout } from "./pages/AdminLayout";
import { Checkout } from "./components/CheckOut";
import { OrderConfirmation } from "./components/OrderConfirmation";
import { Layout } from "./pages/Layout";
import { About } from "./pages/About";
import { Cart } from "./components/Cart";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductPage />,
      },
      {
        path: "products/:id",
        element: <SingleProduct />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "order-confirmation",
        element: <OrderConfirmation />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductPage />,
      },
      {
        path: "products/:id",
        element: <SingleProduct />,
      },
      {
        path: "customers",
        element: <CustomerPage />,
      },
      {
        path: "customers/:id",
        element: <SingleCustomer />,
      },
      {
        path: "orders",
        element: <OrderPage />,
      },
      {
        path: "orders/:id",
        element: <SingleOrder />,
      },
    ],
  },
]);

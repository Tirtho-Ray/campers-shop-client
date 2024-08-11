import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/MainUi/mainLaout";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Products from "../pages/product/Products";
import Dashboard from "../pages/dashboard/dashboard";
import AddProduct from "../pages/dashboard/AddProduct";
import UpdateProduct from "../pages/dashboard/updateProduct";
import ProductDetails from "../pages/product/productDetails";
import ShowCart from "../pages/cart/cart";
import OrderProduct from "../pages/order/order";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
        {
             path: "/",
             element: <Home /> 
        },
        {
             path: "/about",
             element: <About /> 
        },
        {
             path: "/product",
             element: <Products />
        },
        {
             path: "/dashboard",
             element: <Dashboard />
        },
        {
             path: "/addProduct",
             element: <AddProduct />
        },
        
        {
             path: "/updateProduct/:id",
             element: <UpdateProduct />
        },
        
        {
             path: "/addCart",
             element: <ShowCart />
        },
        
        {
             path: "/product/:id",
             element: <ProductDetails />
        },
        {
             path: "/order",
             element: <OrderProduct />
        },
        
      ],
  },
]);
export default router;

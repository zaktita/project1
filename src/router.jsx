import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./Component/DefaultLayout.jsx";
import GuestLayout from "./Component/GuestLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Addproduct from "./pages/Addproduct.jsx";
import Login from "./pages/Login.jsx";
import Login2 from "./pages/Login2.jsx";
import NotFound from "./pages/NotFound.jsx";
import Register from "./pages/Register.jsx";
import Users from "./pages/Users.jsx";
import CategoryList from "./pages/CategoryList.jsx";
import ProductList from "./pages/ProductList.jsx";
import NewCategory from "./pages/NewCategory.jsx";
import OrdersList from "./pages/OrdersList.jsx";
import OrdersDetail from "./pages/OrdersDetail.jsx";
import UpdateCategory from "./pages/UpdateCategory.jsx";
import AddSizes from "./pages/AddSizes.jsx";
import AddColor from "./pages/AddColor.jsx";
import UpdateProduct from "./pages/UpdateProduct.jsx";

const router = createBrowserRouter([
    {
        path:'/',
        element:<DefaultLayout/>,
        children : [
            {
                path:'/',
                element:<Navigate to='/users'/>
            },
            {
                path:'/Users',
                element:<Users/>
            },
            {
                path:'/Dashboard',
                element:<Dashboard/>
            },
            {
                path:'/Addproduct',
                element:<Addproduct/>
            
            },
            {
                path: '/UpdateProduct/:productId',
                element: <UpdateProduct />
              },
            {
                path:'/CategoryList',
                element:<CategoryList/>
            },
            {
                path:'/ProductList',
                element:<ProductList/>
            },
            {
                path:'/NewCategory',
                element:<NewCategory/>
            },
            {
                path: '/UpdateCategory/:categoryId',
                element: <UpdateCategory />
              },
              
            {
                path:'/OrdersList',
                element:<OrdersList/>
            },
            {
                path:'/OrdersDetail/:orderId',
                element:<OrdersDetail/>
            },
            {
                path:'/sizes',
                element:<AddSizes/>
            },
            {
                path:'/colors',
                element:<AddColor/>
            },
        ]
    },
    {
        path:'/',
        element:<GuestLayout/>,
        children:[

            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/login2',
                element:<Login2/>
            },
            {
                path:'/Register',
                element:<Register/>
            },
            
            {
                path:'*',
                element:<NotFound/>
            },
        ]
    },
]);

export default router;
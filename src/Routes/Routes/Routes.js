import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import Main from "../../layout/Main";
import About from "../../Pages/About/About";
import Blog from "../../Pages/Blog/Blog";
import AddProduct from "../../Pages/Dashboard/Dashboard/AddProduct";
import AllBuyer from "../../Pages/Dashboard/Dashboard/AllBuyer";
import AllSeller from "../../Pages/Dashboard/Dashboard/AllSeller";
import MyProduct from "../../Pages/Dashboard/Dashboard/MyProduct";
import MyBooking from "../../Pages/Dashboard/MyBooking/MyBooking";
import Payment from "../../Pages/Dashboard/MyBooking/Payment";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import PageNotFound from "../../Pages/PageNotFound/PageNotFound";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch("http://localhost:5000/product"),
      },
      {
        path: "/category/:id",
        element: <PrivateRoute><Home></Home></PrivateRoute>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/category/${params.id}`),
      },
    
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {},
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/myBooking",
        element: <MyBooking></MyBooking>,
      },
      {
        path: "/dashboard/allbuyer",
        element: <AllBuyer></AllBuyer>,
      },
      {
        path: "/dashboard/allSeller",
        element: <AllSeller></AllSeller>,
      },
      {
        path: "/dashboard/addproduct",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "/dashboard/myProduct",
        element: <MyProduct></MyProduct>,
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment></Payment>,
        loader: ({ params }) => `http://localhost:5000/bookedProduct/${params.id}`
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;

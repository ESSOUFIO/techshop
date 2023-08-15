import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.scss";
import {
  AboutUs,
  CollectionPage,
  Collections,
  Contact,
  CreateAccount,
  Home,
  HotDeal,
  Login,
  ProductPage,
  ResetPassword,
} from "./pages";
import { RootLayout } from "./components";
import Cart from "./components/cart/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/hot-deal",
        element: <HotDeal />,
      },
      {
        path: "/collections",
        element: <Collections />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/product/:id",
        element: <ProductPage />,
      },
      {
        path: "/collection/:id",
        element: <CollectionPage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <CreateAccount />,
      },
      {
        path: "/auth/reset",
        element: <ResetPassword />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;

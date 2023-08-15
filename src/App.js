import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.scss";
import { AboutUs, Collections, Contact, Home, HotDeal } from "./pages";
import { RootLayout } from "./components";
import ProductPage from "./pages/productPage/ProductPage";
import CollectionPage from "./pages/collectionPage/CollectionPage";
import Cart from "./components/cart/Cart";
import CreateAccount from "./pages/createAccount/CreateAccount";
import ResetPassword from "./pages/resetPassword/ResetPassword";

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
        path: "/account/register",
        element: <CreateAccount />,
      },
      {
        path: "/account/reset",
        element: <ResetPassword />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

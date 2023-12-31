import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.scss";
import {
  AboutUs,
  Admin,
  CollectionPage,
  Contact,
  CreateAccount,
  Home,
  Login,
  ProductPage,
  ResetPassword,
} from "./pages";
import { RootLayout } from "./components";
import Cart from "./pages/cart/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OnlyAdminRoute from "./components/onlyAdmin/OnlyAdminRoute";
import CategoryPage from "./pages/categoryPage/CategoryPage";
import CheckoutDetails from "./pages/checkout/CheckoutDetails";
import Checkout from "./pages/checkout/Checkout";
import CheckoutSuccess from "./pages/checkoutSuccess/CheckoutSuccess";
import MyOrders from "./pages/myOrders/MyOrders";
import MyOrderDetails from "./pages/myOrderDetails/MyOrderDetails";
import WishList from "./pages/wishList/WishList";
import MyAddress from "./pages/myAddress/MyAddress";
import SearchResult from "./pages/searchResult/SearchResult";
import ReviewProduct from "./pages/reviews/ReviewProduct";
import MyAccount from "./pages/myAccount/MyAccount";
import NotFound from "./pages/notFound/NotFound";
import Categories from "./pages/categories/Categories";
import FlashDeal from "./pages/flashDeal/FlashDeal";

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
        path: "flash-deal",
        element: <FlashDeal />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "product/:id",
        element: <ProductPage />,
      },
      {
        path: "categories/:id",
        element: <CategoryPage />,
      },
      {
        path: "collections/:id",
        element: <CollectionPage />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout-details",
        element: <CheckoutDetails />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "checkout-success",
        element: <CheckoutSuccess />,
      },
      {
        path: "my-orders",
        element: <MyOrders />,
      },
      {
        path: "my-address",
        element: <MyAddress />,
      },

      {
        path: "my-order/details/:id",
        element: <MyOrderDetails />,
      },

      {
        path: "auth/login",
        element: <Login />,
      },
      {
        path: "auth/register",
        element: <CreateAccount />,
      },
      {
        path: "auth/reset",
        element: <ResetPassword />,
      },
      {
        path: "/admin/*",
        element: (
          <OnlyAdminRoute>
            <Admin />
          </OnlyAdminRoute>
        ),
      },
      {
        path: "wish-list",
        element: <WishList />,
      },
      {
        path: "search-result/:input",
        element: <SearchResult />,
      },
      {
        path: "review-product/:id",
        element: <ReviewProduct />,
      },

      {
        path: "my-account",
        element: <MyAccount />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-left" />
    </>
  );
}

export default App;

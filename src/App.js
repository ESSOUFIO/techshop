import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.scss";
import { AboutUs, Collections, Contact, Home, HotDeal } from "./pages";
import { RootLayout } from "./components";
import ProductPage from "./pages/productPage/ProductPage";

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

import React from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "../../sections";
import { Header } from "..";
import { useSelector } from "react-redux";
import { selectIsAdmin } from "../../redux/authSlice";

const RootLayout = () => {
  const isAdmin = useSelector(selectIsAdmin);
  return (
    <>
      <Header isAdmin={isAdmin} />
      <Outlet />
      {!isAdmin && <Footer />}
    </>
  );
};

export default RootLayout;

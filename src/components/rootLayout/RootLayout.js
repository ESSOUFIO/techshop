import React from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "../../sections";
import { Header } from "..";

const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;

import React from "react";
import { AnnouncementBar, Header, HeaderMobile } from "..";
import { Outlet } from "react-router-dom";
import { Footer } from "../../sections";

const RootLayout = () => {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <HeaderMobile />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;

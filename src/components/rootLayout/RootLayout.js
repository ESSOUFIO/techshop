import React from "react";
import { AnnouncementBar, Header, HeaderMobile } from "..";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <HeaderMobile />
      <Outlet />
    </>
  );
};

export default RootLayout;

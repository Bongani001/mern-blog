import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const SharedFooterLayout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default SharedFooterLayout;

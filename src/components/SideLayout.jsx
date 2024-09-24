import React from "react";
import { Outlet } from "react-router-dom";

const SideLayout = () => {
  return (
    <>
      <div>SideLayout</div>
      <Outlet />
    </>
  );
};

export default SideLayout;

import React, { useContext, useEffect } from "react";
import { NavbarContext } from "../context/NavbarContext";
import ScrollToTop from "../components/ScrollToTop";

const ServerDown = () => {
  const { setSelectedPage } = useContext(NavbarContext);

  useEffect(() => {
    setSelectedPage("");
  }, []);

  return (
    <>
      <div className="flex justify-center items-center min-h-dvh">
        <p className="text-zinc-800 text-xl md:text-3xl text-center">
          The server is temporarily down, we are working on fixing the problem.{" "}
          <br /> <br /> Thank you for your patience
        </p>
      </div>
      <ScrollToTop />
    </>
  );
};

export default ServerDown;

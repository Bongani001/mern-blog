import React from "react";
import ScrollToTop from "../components/ScrollToTop";

const ServerDown = () => {
  return (
    <div className="flex justify-center items-center min-h-dvh">
      <p className="text-zinc-800 text-xl md:text-3xl text-center">
        The server is temporarily down, the technicians are working on fixing
        the problem. <br /> <br /> Thank you for your patience
      </p>
      <ScrollToTop />
    </div>
  );
};

export default ServerDown;

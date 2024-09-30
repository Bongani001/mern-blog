import React from "react";
import ScrollToTop from "../components/ScrollToTop";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 min-h-dvh">
      <span className="text-zinc-800 text-3xl md:text-[4rem] text-center">
        404
      </span>
      <span className="text-zinc-800 text-xl md:text-3xl text-center">
        Page not found.
      </span>
      <span className="text-zinc-800 text-xl md:text-2xl text-center">
        Go to{" "}
        <Link to="/" className="text-blue-500">
          Homepage
        </Link>
      </span>
      <ScrollToTop />
    </div>
  );
};

export default PageNotFound;

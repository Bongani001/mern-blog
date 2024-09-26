import React from "react";
import { GiTwoFeathers } from "react-icons/gi";
import { Link } from "react-router-dom";

// bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-transparent z-40">
      <div className="bg-white rounded-bl-xl rounded-br-xl drop-shadow-sm text-white flex justify-between items-center py-3 px-8 mx-3 md:mx-10 z-40">
        <Link to="/">
          <GiTwoFeathers className="rotate-90 text-gray-800 text-2xl" />
        </Link>

        <div className="space-x-3">
          <Link to="/login">
            <button className="text-gray-800 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="text-gray-800 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

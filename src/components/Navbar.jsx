import React from "react";
import { GiTwoFeathers } from "react-icons/gi";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white flex justify-between items-center py-3 px-8">
      <div className="text-2xl">
        <GiTwoFeathers className="rotate-90" />
      </div>
      <div className="space-x-3">
        <button className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium">
          Login
        </button>
        <button className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

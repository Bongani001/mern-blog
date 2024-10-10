import React, { useContext, useState } from "react";
import { GiTwoFeathers } from "react-icons/gi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { NavbarContext } from "../context/NavbarContext";

// bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium

const Navbar = () => {
  const { pathname } = useLocation();
  const { showSideNav, toggleNavbar } = useContext(NavbarContext);

  const navigate = useNavigate();

  const { user, setUser } = useContext(AuthContext);

  const handleLoginClick = () => {
    navigate("/login", { state: { path: pathname } });
  };

  const handleRegisterClick = () => {
    navigate("/register", { state: { path: pathname } });
  };

  const handleAuthorClick = () => {
    if (user !== null) {
      navigate(`/authors/${user._id}`);
    } else {
      toast.error("You must be logged in to access authors page.");
    }
  };

  const handleSingout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    toast.success("Signed Out.");
    navigate("/");
  };

  return (
    <nav className="fixed top-0 w-full bg-transparent z-40">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white rounded-bl-xl rounded-br-xl drop-shadow-sm text-white flex justify-between items-center py-3 px-8 mx-3 md:mx-10 z-40">
        <Link to="/">
          <GiTwoFeathers className="rotate-90 text-gray-800 text-2xl" />
        </Link>

        <div>
          <div onClick={toggleNavbar} className="md:hidden">
            {showSideNav ? (
              <MdClose className="text-gray-800 text-2xl" />
            ) : (
              <FiMenu className="text-gray-800 text-2xl" />
            )}
          </div>
          <div
            className={`bg-white flex flex-col space-x-2 absolute  w-full right-0 md:static md:w-fit md:flex-row ${
              showSideNav ? "scale-100" : "scale-0 md:scale-100"
            } md:block transition-all ease-out duration-300 z-40`}
          >
            <button
              onClick={() => {
                toggleNavbar();
                navigate("/");
              }}
              className="text-gray-800 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              Home
            </button>
            <button
              onClick={() => {
                toggleNavbar();
                navigate("/posts");
              }}
              className="text-gray-800 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              Blogs
            </button>
            <button
              onClick={() => {
                toggleNavbar();
                handleAuthorClick();
              }}
              className="text-gray-800 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              Author
            </button>
            {user ? (
              <button
                onClick={() => {
                  toggleNavbar();
                  handleSingout();
                }}
                className="text-gray-800 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              >
                Sign Out
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    toggleNavbar();
                    handleLoginClick();
                  }}
                  className="text-gray-800 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    toggleNavbar();
                    handleRegisterClick();
                  }}
                  className="text-gray-800 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

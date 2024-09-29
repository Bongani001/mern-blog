import React, { useContext } from "react";
import { GiTwoFeathers } from "react-icons/gi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

// bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium

const Navbar = () => {
  const { pathname } = useLocation();
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
      navigate("/manageblogs");
    } else {
      toast.error("You must be logged in to access this page.");
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

        <div className="space-x-2">
          {" "}
          <Link to="/">
            <button className="text-gray-800 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
              Home
            </button>
          </Link>
          <Link to="/posts">
            <button className="text-gray-800 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
              Blogs
            </button>
          </Link>
          <button
            onClick={handleAuthorClick}
            className="text-gray-800 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
          >
            Author
          </button>
          {user ? (
            <button
              onClick={handleSingout}
              className="text-gray-800 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              Sign Out
            </button>
          ) : (
            <>
              <button
                onClick={handleLoginClick}
                className="text-gray-800 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              >
                Login
              </button>
              <button
                onClick={handleRegisterClick}
                className="text-gray-800 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

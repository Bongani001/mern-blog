import React, { useContext, useEffect, useState } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineMail } from "react-icons/md";
import { loginUser } from "../../services/users";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import ScrollToTop from "../../components/ScrollToTop";
import { AuthContext } from "../../context/AuthContext";
import { NavbarContext } from "../../context/NavbarContext";

const Login = () => {
  const [body, setBody] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const { setUser } = useContext(AuthContext);
  const { setSelectedPage } = useContext(NavbarContext);

  const { state } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    setSelectedPage("login");
  }, []);

  const handleFormChange = (e) => {
    setBody((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    setErrors((prev) => {
      return { ...prev, [e.target.name]: "" };
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = await loginUser({
      email: body.email,
      password: body.password,
    });
    if (data === "Network Error") {
      toast.error("Server error, come back later.");
      return;
    } else if (data?.errors) {
      data.errors.forEach((err) => {
        if (err.type) {
          setErrors((prev) => {
            return {
              ...prev,
              [err.path]: err.msg,
            };
          });
        } else {
          toast.error(err.msg);
          return;
        }
      });
      return;
    } else if (data === undefined) {
      toast.error("Server error, come back later.");
      return;
    }
    toast.success("Login Successful.");
    localStorage.setItem("userInfo", JSON.stringify(data));
    setUser(data);
    if (state !== null) {
      if (state.path === "/login" || state.path === "/register") {
        navigate("/");
      } else {
        navigate(state.path);
      }
    } else {
      console.log(navigate("/"));
    }
  };

  return (
    <div className="flex justify-center items-center flex-grow min-h-screen mt-16">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="py-8 px-20  md:shadow-2xl rounded-2xl">
        <h1 className="text-center text-2xl font-medium">Login</h1>
        <form onSubmit={handleFormSubmit} className="mt-3 flex flex-col gap-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email:
            </label>
            <div
              className={`${
                errors.email ? "border border-red-600" : ""
              } relative flex items-center bg-zinc-300 rounded-lg`}
            >
              <MdOutlineMail className="absolute m-2 text-lg " />
              <input
                type="text"
                name="email"
                id="email"
                placeholder="example@email.com"
                value={body.email}
                onChange={handleFormChange}
                className="rounded-lg p-2 ml-6 focus:outline-none bg-zinc-300 text-gray-500"
              />
            </div>
            {errors.email ? (
              <pre className="text-xs mt-2 text-red-600 italic">
                {errors.email}
              </pre>
            ) : (
              ""
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password:
            </label>
            <div
              className={`${
                errors.password ? "border border-red-600" : ""
              } relative flex items-center bg-zinc-300 rounded-lg`}
            >
              <RiLockPasswordLine className="absolute m-2 text-lg " />
              <input
                type="password"
                name="password"
                id="password"
                value={body.password}
                onChange={handleFormChange}
                className="rounded-lg p-2 ml-6 focus:outline-none bg-zinc-300 text-gray-500"
              />
            </div>
            {errors.password ? (
              <pre className="text-xs mt-2 text-red-600 italic">
                {errors.password}
              </pre>
            ) : (
              ""
            )}
          </div>
          <button
            type="submit"
            className="bg-gray-800 py-2 px-4 mt-4 text-white rounded self-center"
          >
            Login
          </button>
        </form>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { RiLockPasswordLine, RiUserLine } from "react-icons/ri";
import { MdOutlineMail } from "react-icons/md";
import { registerUser } from "../../services/users";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const [body, setBody] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

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
    const { email, username, password, confirmPassword } = body;
    const data = await registerUser({
      email,
      username,
      password,
      confirmPassword,
    });
    if (data?.errors) {
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
        }
      });
      return;
    } else if (data === undefined) {
      toast.error("Server error, come back later.");
      return;
    }
    toast.success("Successfully Registered.");
  };

  return (
    <div className="flex justify-center items-center flex-grow">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="py-8 px-20 bg-white shadow-2xl rounded">
        <h1 className="text-center text-2xl font-medium">Register</h1>
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
              } relative flex items-center bg-gray-100 rounded-lg`}
            >
              <MdOutlineMail className="absolute m-2 text-lg " />
              <input
                type="text"
                name="email"
                id="email"
                placeholder="example@email.com"
                value={body.email}
                onChange={handleFormChange}
                className="rounded-lg p-2 ml-6 focus:outline-none bg-gray-100 text-gray-500"
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
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username:
            </label>
            <div
              className={`${
                errors.username ? "border border-red-600" : ""
              } relative flex items-center bg-gray-100 rounded-lg`}
            >
              <RiUserLine className="absolute m-2 text-lg " />
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Ghost"
                value={body.username}
                onChange={handleFormChange}
                className="rounded-lg p-2 ml-6 focus:outline-none bg-gray-100 text-gray-500"
              />
            </div>
            {errors.username ? (
              <pre className="text-xs mt-2 text-red-600 italic">
                {errors.username}
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
              } relative flex items-center bg-gray-100 rounded-lg`}
            >
              <RiLockPasswordLine className="absolute m-2 text-lg " />
              <input
                type="password"
                name="password"
                id="password"
                value={body.password}
                onChange={handleFormChange}
                className="rounded-lg p-2 ml-6 focus:outline-none bg-gray-100 text-gray-500"
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
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Confirm Password:
            </label>
            <div
              className={`${
                errors.confirmPassword ? "border border-red-600" : ""
              } relative flex items-center bg-gray-100 rounded-lg`}
            >
              <RiLockPasswordLine className="absolute m-2 text-lg " />
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={body.confirmPassword}
                onChange={handleFormChange}
                className="rounded-lg p-2 ml-6 focus:outline-none bg-gray-100 text-gray-500"
              />
            </div>
            {errors.confirmPassword ? (
              <pre className="text-xs mt-2 text-red-600 italic">
                {errors.confirmPassword}
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
    </div>
  );
};

export default Register;

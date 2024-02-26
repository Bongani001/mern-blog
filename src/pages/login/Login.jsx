import React, { useState } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineMail } from "react-icons/md";

const Login = () => {
  const [body, setBody] = useState({
    email: "",
    password: "",
  });

  const handleFormChange = (e) => {
    setBody((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(body);
  };
  return (
    <div className="flex justify-center items-center flex-grow">
      <div className="py-8 px-20 bg-white shadow-2xl rounded">
        <h1 className="text-center text-2xl font-medium">Login</h1>
        <form onSubmit={handleFormSubmit} className="mt-3 flex flex-col gap-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email:
            </label>
            <div className="relative flex items-center bg-gray-100 ">
              <MdOutlineMail className="absolute m-2 text-lg " />
              <input
                type="text"
                name="email"
                id="email"
                placeholder="example@email.com"
                value={body.email}
                onChange={handleFormChange}
                className="rounded p-2 ml-6 focus:outline-none bg-gray-100 text-gray-500"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password:
            </label>
            <div className="relative flex items-center bg-gray-100 ">
              <RiLockPasswordLine className="absolute m-2 text-lg " />
              <input
                type="password"
                name="password"
                id="password"
                value={body.password}
                onChange={handleFormChange}
                className="rounded p-2 ml-6 focus:outline-none bg-gray-100 text-gray-500"
              />
            </div>
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

export default Login;

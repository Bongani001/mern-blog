import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import SharedLayout from "./components/SharedLayout";
import SideLayout from "./components/SideLayout";
import Posts from "./pages/blogPost/Posts";
import PostDetails from "./pages/blogPost/PostDetails";

function App() {
  return (
    <div className="bg-gray-100 min-h-dvh flex flex-col">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Homepage />} />
            <Route path="/posts" element={<SideLayout />}>
              <Route index element={<Posts />} />
              <Route path=":id" element={<PostDetails />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

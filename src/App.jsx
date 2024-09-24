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
import SharedFooterLayout from "./components/SharedFooterLayout";

function App() {
  return (
    <div className="bg-gray-100 min-h-dvh flex flex-col">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route path="/" element={<SharedFooterLayout />}>
              <Route index element={<Homepage />} />
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

import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import SharedLayout from "./components/SharedLayout";
import Posts from "./pages/blogPost/Posts";
import PostDetails from "./pages/blogPost/PostDetails";
import ServerDown from "./pages/ServerDown";
import PageNotFound from "./pages/PageNotFound";
import AuthorPosts from "./pages/author/AuthorPosts";

function App() {
  return (
    <div className="bg-gray-200 min-h-dvh flex flex-col">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Homepage />} />
            <Route path="posts" element={<Posts />} />
            <Route path="posts/:id" element={<PostDetails />} />
            <Route path="authors/:authorid" element={<AuthorPosts />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="serverdown" element={<ServerDown />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

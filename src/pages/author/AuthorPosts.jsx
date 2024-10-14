import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthorMostViewedPosts, getAuthorPosts } from "../../services/posts";
import { FaBullseye } from "react-icons/fa";
import BlogsLayout from "../../components/BlogsLayout";
import ScrollToTop from "../../components/ScrollToTop";
import { NavbarContext } from "../../context/NavbarContext";

const AuthorPosts = () => {
  const [posts, setPosts] = useState([]);
  const [topPosts, setTopPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  const { user } = useContext(AuthContext);
  const { setSelectedPage } = useContext(NavbarContext);

  const navigate = useNavigate();

  const { authorid } = useParams();

  useEffect(() => {
    setSelectedPage("author");
    let author = localStorage.getItem("userInfo");
    if (author == null) {
      navigate("/");
      toast.error("You must be logged in to access that page.", {
        duration: 8000,
      });
      return;
    }
    const getPosts = async (authorid) => {
      const authorPosts = await getAuthorPosts(authorid, 0);
      const authorTopPosts = await getAuthorMostViewedPosts(authorid, 0);
      if (
        authorPosts === "Network Error" ||
        authorTopPosts === "Network Error"
      ) {
        navigate("/serverdown");
      }
      setPosts(authorPosts);
      setTopPosts(authorTopPosts);
      setIsLoadingPosts(false);
    };

    getPosts(authorid);
  }, []);

  return (
    <div className="min-h-[70dvh]">
      <Toaster position="top-center" reverseOrder={false} />
      <BlogsLayout
        posts={posts}
        topPosts={topPosts}
        isLoadingPosts={isLoadingPosts}
        mostViewed={`Most viewed blogs by ${user?.username}`}
        mainTitle={`Blogs by ${user?.username}`}
      />
      <ScrollToTop />
    </div>
  );
};

export default AuthorPosts;

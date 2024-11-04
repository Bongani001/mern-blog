import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getAuthorMostViewedPosts, getAuthorPosts } from "../../services/posts";
import { FaBullseye } from "react-icons/fa";
import BlogsLayout from "../../components/BlogsLayout";
import ScrollToTop from "../../components/ScrollToTop";
import { NavbarContext } from "../../context/NavbarContext";
import { getAllCategories } from "../../services/categories";

const AuthorPosts = () => {
  const [posts, setPosts] = useState([]);
  const [topPosts, setTopPosts] = useState([]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  const { user } = useContext(AuthContext);
  const { setSelectedPage } = useContext(NavbarContext);

  const [searchParams] = useSearchParams();

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

    setPosts([]);
    const cat = searchParams.get("category");
    setCategory(cat);

    const getPosts = async (authorid) => {
      setIsLoadingPosts(true);
      // Get the categories
      const categoriesData = await getAllCategories();

      const authorPosts = await getAuthorPosts(authorid, 0);

      const authorTopPosts = await getAuthorMostViewedPosts(authorid, 0);
      if (
        authorPosts === "Network Error" ||
        authorTopPosts === "Network Error"
      ) {
        navigate("/serverdown");
      }

      setIsLoadingPosts(false);
      setCategories(categoriesData);
      setPosts(authorPosts);
      setTopPosts(authorTopPosts);
    };

    getPosts(authorid);
  }, [selectedCategory]);

  return (
    <div className="min-h-[70dvh]">
      <Toaster position="bottom-right" reverseOrder={false} />
      <BlogsLayout
        posts={posts}
        topPosts={topPosts}
        selectedCategory={category}
        setSelectedCategory={setSelectedCategory}
        isLoadingPosts={isLoadingPosts}
        categories={categories}
        mostViewed={`Most viewed blogs by ${user?.username}`}
        mainTitle={`Blogs by ${user?.username}`}
      />
      <ScrollToTop />
    </div>
  );
};

export default AuthorPosts;

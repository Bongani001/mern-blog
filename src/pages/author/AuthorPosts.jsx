import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  getAuthorMostViewedPosts,
  getAuthorPosts,
  getUserPostsByCategory,
} from "../../services/posts";
import BlogsLayout from "../../components/BlogsLayout";
import { NavbarContext } from "../../context/NavbarContext";
import { getAllCategories } from "../../services/categories";
import ScrollToTop from "../../components/ScrollToTop";

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

      // Get posts
      let authorPosts = [];
      if (cat == "all") {
        // Get all posts (argument=(author id,number of posts to fetch))
        authorPosts = await getAuthorPosts(authorid, 10);
      } else {
        let categoryId = "";
        categoriesData.forEach((cate) => {
          if (cate.name.toLowerCase() == cat.toLowerCase()) {
            categoryId = cate._id;
          }
        });

        // Get posts by category (arguments=(category id, number of posts to fetch))
        authorPosts = await getUserPostsByCategory(authorid, categoryId, 10);
      }

      // // Get user's most viewed posts (argument=(author id, number of posts to fetch))
      const authorTopPosts = await getAuthorMostViewedPosts(authorid, 10);

      if (
        authorPosts === "Network Error" ||
        authorTopPosts === "Network Error" ||
        categoriesData === "Network Error"
      ) {
        navigate("/serverdown");
      }

      console.log(authorPosts);
      setIsLoadingPosts(false);
      setCategories(categoriesData);
      setPosts(authorPosts);
      setTopPosts(authorTopPosts);
    };

    getPosts(authorid);
  }, [selectedCategory]);

  return (
    <div className="min-h-[70dvh]">
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

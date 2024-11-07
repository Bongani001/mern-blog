import React, { useContext, useEffect, useState } from "react";
import {
  getLatestPosts,
  getMostViewedPosts,
  getPostsByCategory,
} from "../../services/posts";
import { useNavigate, useSearchParams } from "react-router-dom";
import BlogsLayout from "../../components/BlogsLayout";
import { NavbarContext } from "../../context/NavbarContext";
import ScrollToTop from "../../components/ScrollToTop";
import { useCategories } from "../../store/useCategories";
import { usePosts } from "../../store/usePosts";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState("");
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  const [searchParams] = useSearchParams();

  const { categories, selectedCategory } = useCategories();
  const {
    latestPosts,
    mostViewedPosts,
    postsByCategory,
    fetchPostsByCategory,
  } = usePosts();

  const { setSelectedPage } = useContext(NavbarContext);
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedPage("blogs");
    const cat = searchParams.get("category");
    setCategory(cat);

    const getPosts = async () => {
      setIsLoadingPosts(true);

      // Get posts
      if (cat == "all") {
        setPosts(latestPosts);
      } else {
        let categoryId = "";
        categories.forEach((cate) => {
          if (cate.name.toLowerCase() == cat.toLowerCase()) {
            categoryId = cate._id;
          }
        });

        // Get posts by category
        fetchPostsByCategory(categoryId);
        setPosts(postsByCategory);
      }

      if (posts === "Network Error" || categories === "Network Error") {
        navigate("/serverdown");
      }

      setIsLoadingPosts(false);
    };

    getPosts();
  }, [selectedCategory]);

  return (
    <>
      <BlogsLayout
        posts={category == "all" ? latestPosts : postsByCategory}
        topPosts={mostViewedPosts}
        selectedCategory={category}
        isLoadingPosts={isLoadingPosts}
        mostViewed="Top Picks"
        mainTitle="Blogs"
      />
      <ScrollToTop />
    </>
  );
};

export default Posts;

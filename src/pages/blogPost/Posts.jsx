import React, { useContext, useEffect, useState } from "react";
import {
  getLatestPosts,
  getMostViewedPosts,
  getPostsByCategory,
} from "../../services/posts";
import { useNavigate, useSearchParams } from "react-router-dom";
import ScrollToTop from "../../components/ScrollToTop";
import BlogsLayout from "../../components/BlogsLayout";
import { NavbarContext } from "../../context/NavbarContext";
import { getAllCategories } from "../../services/categories";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [topPosts, setTopPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  const [searchParams] = useSearchParams();

  const { setSelectedPage } = useContext(NavbarContext);
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedPage("blogs");
    setPosts([]);
    const cat = searchParams.get("category");
    setCategory(cat);

    const getPosts = async () => {
      setIsLoadingPosts(true);
      // Get the categories
      const categoriesData = await getAllCategories();

      // Get posts
      let data = [];
      if (cat == "all") {
        // Get all posts (argument=number of posts to fetch)
        data = await getLatestPosts(10);
      } else {
        let categoryId = "";
        categoriesData.forEach((cate) => {
          if (cate.name.toLowerCase() == cat.toLowerCase()) {
            categoryId = cate._id;
          }
        });

        // Get posts by category (arguments=(category id, number of posts to fetch))
        data = await getPostsByCategory(categoryId, 10);
      }

      // Get top picks (argument=number of posts to fetch)
      let top = await getMostViewedPosts(10);
      if (
        data === "Network Error" ||
        top === "Network Error" ||
        categoriesData === "Network Error"
      ) {
        navigate("/serverdown");
      }

      setIsLoadingPosts(false);
      setCategories(categoriesData);
      setPosts(data);
      setTopPosts(top);
    };

    getPosts();
  }, [selectedCategory]);

  return (
    <>
      <BlogsLayout
        posts={posts}
        topPosts={topPosts}
        selectedCategory={category}
        setSelectedCategory={setSelectedCategory}
        isLoadingPosts={isLoadingPosts}
        categories={categories}
        mostViewed="Top Picks"
        mainTitle="Blogs"
      />
      <ScrollToTop />
    </>
  );
};

export default Posts;

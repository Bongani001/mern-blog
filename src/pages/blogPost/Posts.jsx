import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BlogsLayout from "../../components/BlogsLayout";
import { NavbarContext } from "../../context/NavbarContext";
import ScrollToTop from "../../components/ScrollToTop";
import { useCategories } from "../../store/useCategories";
import { usePosts } from "../../store/usePosts";
import { getAllCategories } from "../../services/categories";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState("");
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  const [searchParams] = useSearchParams();

  let { categories, selectedCategory } = useCategories();
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
      if (categories == 0) {
        categories = await getAllCategories();
      }

      // Get posts
      if (cat !== "all") {
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

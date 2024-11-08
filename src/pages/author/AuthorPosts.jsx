import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import BlogsLayout from "../../components/BlogsLayout";
import { NavbarContext } from "../../context/NavbarContext";
import { getAllCategories } from "../../services/categories";
import ScrollToTop from "../../components/ScrollToTop";
import { useUser } from "../../store/useUser";
import { useCategories } from "../../store/useCategories";

const AuthorPosts = () => {
  const [category, setCategory] = useState("");

  const { setSelectedPage } = useContext(NavbarContext);

  const {
    user,
    userPosts,
    userTopPosts,
    userPostsByCategory,
    isLoading,
    fetchAllUserPosts,
    fetchUserPostsByCategory,
    fetchUserMostViewedPosts,
  } = useUser();
  let { categories, selectedCategory } = useCategories();

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserMostViewedPosts(user._id);
  }, []);

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

    const cat = searchParams.get("category");
    setCategory(cat);

    const getPosts = async () => {
      // Get categories if not yet initialised in the store
      if (categories == 0) {
        categories = await getAllCategories();
      }

      // Get posts
      if (cat == "all") {
        fetchAllUserPosts(user._id, 10);
      } else {
        let categoryId = "";
        categories.forEach((cate) => {
          if (cate.name.toLowerCase() == cat.toLowerCase()) {
            categoryId = cate._id;
          }
        });

        // Get posts by category
        fetchUserPostsByCategory(user._id, categoryId, 10);
      }

      if (
        userPosts === "Network Error" ||
        userTopPosts === "Network Error" ||
        categories === "Network Error"
      ) {
        navigate("/serverdown");
      }
    };

    getPosts();
  }, [selectedCategory]);

  return (
    <div className="min-h-[70dvh]">
      <BlogsLayout
        posts={category == "all" ? userPosts : userPostsByCategory}
        topPosts={userTopPosts}
        selectedCategory={category}
        isLoadingPosts={isLoading}
        mostViewed={`Most viewed blogs by ${user?.username}`}
        mainTitle={`Blogs by ${user?.username}`}
      />
      <ScrollToTop />
    </div>
  );
};

export default AuthorPosts;

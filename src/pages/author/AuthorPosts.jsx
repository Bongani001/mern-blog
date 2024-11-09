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
  const [currentPage, setCurrentPage] = useState(1); // pagination Index

  const { setSelectedPage } = useContext(NavbarContext);

  const {
    user,
    userPosts,
    userTopPosts,
    userPostsByCategory,
    isLoading,
    fetchUserPostsByCategory,
    fetchUserMostViewedPosts,
  } = useUser();
  let { categories, selectedCategory } = useCategories();

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserMostViewedPosts(user._id);
  }, []);

  let page = 1;
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
    page = Number(searchParams.get("page"));

    const getPosts = async () => {
      // Get categories if not yet initialised in the store
      if (categories == 0) {
        categories = await getAllCategories();
      }

      // Get posts
      if (cat == "all") {
        // Get posts by category
        fetchUserPostsByCategory(user._id, cat, page);
      } else {
        let categoryId = "";
        categories.forEach((cate) => {
          if (cate.name.toLowerCase() == cat.toLowerCase()) {
            categoryId = cate._id;
          }
        });

        // Get posts by category
        fetchUserPostsByCategory(user._id, categoryId, page);
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

  // Invoke when user click to request another page.
  // Pagination
  const handlePageClick = (event) => {
    window.scrollTo({ top: 50, behavior: "smooth" });
    let categoryName = "";
    if (category == "all") {
      const address = "?category=all&page=" + Number(event.selected + 1);
      navigate(address);
      setCurrentPage(event.selected + 1);
      fetchUserPostsByCategory(user._id, category, event.selected + 1);
    } else {
      let categoryId;
      categories.forEach((cate) => {
        if (cate.name.toLowerCase() == category.toLowerCase()) {
          categoryId = cate._id;
          categoryName = category.toLowerCase();
        }
      });
      setCurrentPage(event.selected + 1);
      fetchUserPostsByCategory(user._id, categoryId, event.selected + 1);
      const address =
        `?category=${categoryName}&page=` + Number(event.selected + 1);
      navigate(address);
    }
  };

  return (
    <div className="min-h-[70dvh]">
      <BlogsLayout
        posts={userPostsByCategory.posts}
        pageCount={userPostsByCategory.count}
        topPosts={userTopPosts}
        selectedCategory={category}
        isLoadingPosts={isLoading}
        fetchPostsByCategory={fetchUserPostsByCategory}
        handlePageClick={handlePageClick}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        mostViewed={`Most viewed blogs by ${user?.username}`}
        mainTitle={`Blogs by ${user?.username}`}
      />
      <ScrollToTop />
    </div>
  );
};

export default AuthorPosts;

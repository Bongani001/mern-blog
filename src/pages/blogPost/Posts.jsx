import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BlogsLayout from "../../components/BlogsLayout";
import { NavbarContext } from "../../context/NavbarContext";
import ScrollToTop from "../../components/ScrollToTop";
import { useCategories } from "../../store/useCategories";
import { usePosts } from "../../store/usePosts";
import { getAllCategories } from "../../services/categories";

const Posts = () => {
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // pagination Index

  const [searchParams] = useSearchParams();

  let { categories, selectedCategory } = useCategories();
  const { mostViewedPosts, postsByCategory, fetchPostsByCategory, isLoading } =
    usePosts();

  const { setSelectedPage } = useContext(NavbarContext);

  const navigate = useNavigate();

  let page = 1;
  useEffect(() => {
    setSelectedPage("blogs");
    const cat = searchParams.get("category");
    setCategory(cat);
    page = searchParams.get("page");

    const getPosts = async () => {
      // Get categories if not yet initialised in the store
      if (categories == 0) {
        categories = await getAllCategories();
      }

      // Get posts
      if (cat == "all") {
        // Get posts by category
        fetchPostsByCategory(cat, page);
      } else {
        let categoryId = "";
        categories.forEach((cate) => {
          if (cate.name.toLowerCase() == cat.toLowerCase()) {
            categoryId = cate._id;
          }
        });

        // Get posts by category
        fetchPostsByCategory(categoryId, page);
      }

      if (
        mostViewedPosts === "Network Error" ||
        postsByCategory === "Network Error" ||
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
      fetchPostsByCategory(category, event.selected + 1);
    } else {
      let categoryId;
      categories.forEach((cate) => {
        if (cate.name.toLowerCase() == category.toLowerCase()) {
          categoryId = cate._id;
          categoryName = category.toLowerCase();
        }
      });
      setCurrentPage(event.selected + 1);
      fetchPostsByCategory(categoryId, event.selected + 1);
      const address =
        `?category=${categoryName}&page=` + Number(event.selected + 1);
      navigate(address);
    }
  };

  return (
    <>
      <BlogsLayout
        posts={postsByCategory.posts}
        pageCount={postsByCategory.count}
        topPosts={mostViewedPosts}
        selectedCategory={category}
        isLoadingPosts={isLoading}
        fetchPostsByCategory={fetchPostsByCategory}
        handlePageClick={handlePageClick}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        mostViewed="Top Picks"
        mainTitle="Blogs"
      />
      <ScrollToTop />
    </>
  );
};

export default Posts;

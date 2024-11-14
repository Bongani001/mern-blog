import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BlogsLayout from "../../components/BlogsLayout";
import { NavbarContext } from "../../context/NavbarContext";
import ScrollToTop from "../../components/ScrollToTop";
import { useCategories } from "../../store/useCategories";
import { usePosts } from "../../store/usePosts";
import { getAllCategories } from "../../services/categories";
import { useDebouncedCallback } from "use-debounce";

const Posts = () => {
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // pagination index
  const [search, setSearch] = useState("");
  const [resetPage, setResetPage] = useState(false);

  const { setSelectedPage } = useContext(NavbarContext);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  let { categories, selectedCategory } = useCategories();
  const { mostViewedPosts, postsByCategory, fetchPostsByCategory, isLoading } =
    usePosts();

  // delayed search request after user pauses typing on the search input
  const debounced = useDebouncedCallback((value) => {
    setResetPage(true); // reset page to page 1 for a new search request
    setCurrentPage(1); // reset pagination index to 1

    setSearch(value);

    if (category === "all") {
      navigate(`?search=${value}&category=all&page=1`);
    } else {
      let categoryId;
      let categoryName = "";
      categories.forEach((cate) => {
        if (cate.name.toLowerCase() == category.toLowerCase()) {
          categoryId = cate._id;
          categoryName = category.toLowerCase();
        }
      });

      navigate(`?search=${value}&category=${categoryName}&page=1`);
    }
  }, 2000);

  const navigate = useNavigate();

  let page = 1;
  useEffect(() => {
    setSelectedPage("blogs");
    const cat = searchParams.get("category");
    const searchParam = searchParams.get("search") || "";
    setCategory(cat);
    setSearch(searchParam);
    page = searchParams.get("page");

    // if its's a serach query, reset pagination index to 1
    if (resetPage) page = 1;

    const getPosts = async () => {
      // Get categories if not yet initialised in the store
      if (categories == 0) {
        categories = await getAllCategories();
      }

      // Get posts
      if (cat == "all") {
        // Get all posts
        fetchPostsByCategory(cat, searchParam, page);
      } else {
        let categoryId = "";
        categories.forEach((cate) => {
          if (cate.name.toLowerCase() == cat.toLowerCase()) {
            categoryId = cate._id;
          }
        });

        // Get posts by category
        fetchPostsByCategory(categoryId, searchParam, page);
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
  }, [selectedCategory, searchQuery]);

  // Invoke when user click to request another page.
  // Pagination
  const handlePageClick = (event) => {
    window.scrollTo({ top: 50, behavior: "smooth" });
    let categoryName = "";
    if (category == "all") {
      // change page number
      const url =
        `?search=${search}&category=all&page=` + Number(event.selected + 1);
      navigate(url);

      setCurrentPage(event.selected + 1);
      fetchPostsByCategory(category, search, event.selected + 1);
    } else {
      let categoryId;
      categories.forEach((cate) => {
        if (cate.name.toLowerCase() == category.toLowerCase()) {
          categoryId = cate._id;
          categoryName = category.toLowerCase();
        }
      });
      setCurrentPage(event.selected + 1);
      fetchPostsByCategory(categoryId, search, event.selected + 1);

      // change page number
      const url =
        `?search=${search}&category=${categoryName}&page=` +
        Number(event.selected + 1);
      navigate(url);
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
        search={search}
        setSearch={debounced}
        mostViewed="Top Picks"
        mainTitle="Blogs"
      />
      <ScrollToTop />
    </>
  );
};

export default Posts;

import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import BlogsLayout from "../../components/BlogsLayout";
import { NavbarContext } from "../../context/NavbarContext";
import { getAllCategories } from "../../services/categories";
import ScrollToTop from "../../components/ScrollToTop";
import { useUser } from "../../store/useUser";
import { useCategories } from "../../store/useCategories";
import { useDebouncedCallback } from "use-debounce";

const AuthorPosts = () => {
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // pagination Index
  const [search, setSearch] = useState("");
  const [resetPage, setResetPage] = useState(false);

  const { setSelectedPage } = useContext(NavbarContext);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

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
    const searchParam = searchParams.get("search") || "";
    setCategory(cat);
    setSearch(searchParam);
    page = Number(searchParams.get("page"));

    // if its's a serach query, reset pagination index to 1
    if (resetPage) page = 1;

    const getPosts = async () => {
      // Get categories if not yet initialised in the store
      if (categories == 0) {
        categories = await getAllCategories();
      }

      // Get posts
      if (cat == "all") {
        // Get posts by category
        fetchUserPostsByCategory(user._id,searchParam, cat, page);
      } else {
        let categoryId = "";
        categories.forEach((cate) => {
          if (cate.name.toLowerCase() == cat.toLowerCase()) {
            categoryId = cate._id;
          }
        });

        // Get posts by category
        fetchUserPostsByCategory(user._id,searchParam, categoryId, page);
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
  }, [selectedCategory,searchQuery]);

  // Invoke when user click to request another page.
  // Pagination
  const handlePageClick = (event) => {
    window.scrollTo({ top: 50, behavior: "smooth" });
    let categoryName = "";
    if (category == "all") {
      // change page number
      const url = `?search=${search}&category=all&page=` + Number(event.selected + 1);
      navigate(url);

      setCurrentPage(event.selected + 1);
      fetchUserPostsByCategory(user._id,search, category, event.selected + 1);
    } else {
      let categoryId;
      categories.forEach((cate) => {
        if (cate.name.toLowerCase() == category.toLowerCase()) {
          categoryId = cate._id;
          categoryName = category.toLowerCase();
        }
      });
      setCurrentPage(event.selected + 1);
      fetchUserPostsByCategory(user._id,search, categoryId, event.selected + 1);

      // change page number
      const url =
        `?search=${search}&category=${categoryName}&page=` + Number(event.selected + 1);
      navigate(url);
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
        search={search}
        setSearch={debounced}
        mostViewed={`Most viewed blogs by ${user?.username}`}
        mainTitle={`Blogs by ${user?.username}`}
      />
      <ScrollToTop />
    </div>
  );
};

export default AuthorPosts;

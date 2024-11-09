import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import PostCard from "./PostCard";
import loading from "../assets/three.gif";
import { useCategories } from "../store/useCategories";
import ReactPaginate from "react-paginate";
import "../styles/pagination.css";

const BlogsLayout = ({
  posts,
  pageCount,
  topPosts,
  isLoadingPosts,
  mostViewed,
  mainTitle,
  selectedCategory,
  handlePageClick,
  currentPage,
  setCurrentPage,
}) => {
  const { categories, changeSelectedCategory } = useCategories();

  const navigate = useNavigate();

  return (
    <div className="md:grid md:grid-cols-4 min-h-[70dvh] pt-20 pb-8 px-3">
      {posts && (
        <>
          <div className="hidden md:block h-fit bg-white/70 rounded-xl col-span-1 px-3 py-2 shadow border-r-zinc-300">
            <h2 className="text-zinc-800 text-2xl font-semibold">
              {mostViewed}
            </h2>
            <div className="">
              {topPosts.length < 1 && !isLoadingPosts && (
                <span className="flex italic sm:col-span-2 lg:col-span-3 justify-center">
                  No blogs available.
                </span>
              )}
              {topPosts?.map((post, index) => {
                return (
                  <div
                    key={post._id}
                    className="flex gap-3 border-b border-zinc-300 py-2"
                  >
                    <span className="text-lg font-bold">{index + 1}</span>
                    <div className="col-span-2 md:flex md:flex-col md:justify-between md:h-full">
                      <div className="">
                        <Link to={`/posts/${post._id}`}>
                          <h3 className="text-zinc-800 text-base font-semibold line-clamp-2">
                            {post.title}
                          </h3>
                        </Link>
                      </div>
                      <span className="text-zinc-500 text-sm">{`${
                        post.categoryId.name
                      } ▪  ${new Date(
                        post.createdAt
                      ).toLocaleDateString()}`}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-span-3 px-2 md:ml-2">
            <p className="text-zinc-800 text-2xl text-center font-semibold mb-3">
              {mainTitle}
            </p>
            {mainTitle.includes("by") && (
              <button
                onClick={() => navigate("edit", { state: { post: null } })}
                type="button"
                className="bg-blue-500 text-white text-xs font-medium rounded-lg px-3 py-2 m-3"
              >
                Create Post
              </button>
            )}
            <div className="sm:flex gap-4 mb-4 ">
              <span className="font-semibold whitespace-nowrap">
                By Category:
              </span>
              <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap gap-2">
                <button
                  onClick={() => {
                    setCurrentPage(1);
                    changeSelectedCategory("all");
                    navigate("?category=all&page=1");
                  }}
                  type="button"
                  disabled={selectedCategory == "all"}
                  className={`${
                    selectedCategory == "all" ? "bg-zinc-800" : "bg-zinc-500"
                  }  text-white text-xs font-medium hover:bg-zinc-800 rounded-lg px-3 py-2`}
                >
                  All
                </button>
                {categories?.map((category) => {
                  return (
                    <button
                      onClick={() => {
                        setCurrentPage(1);
                        changeSelectedCategory(category.name.toLowerCase());
                        navigate(
                          `?category=${category.name.toLowerCase()}&page=1`
                        );
                      }}
                      type="button"
                      key={category._id}
                      disabled={selectedCategory == category.name.toLowerCase()}
                      className={`${
                        selectedCategory == category.name.toLowerCase()
                          ? "bg-zinc-800"
                          : "bg-zinc-500"
                      } text-white text-xs capitalize font-medium hover:bg-zinc-800 rounded-lg px-3 py-2`}
                    >
                      {category.name}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
              {isLoadingPosts && (
                <div className="flex sm:col-span-2 lg:col-span-3 justify-center">
                  <img src={loading} alt="loading..." className="w-20" />
                </div>
              )}
              {posts?.length < 1 && !isLoadingPosts && (
                <span className="flex italic sm:col-span-2 lg:col-span-3 justify-center">
                  No blog posts available.
                </span>
              )}
              {posts?.map((post) => {
                return <PostCard key={post._id} post={post} date={true} />;
              })}
            </div>
            <div className=" ">
              <ReactPaginate
                breakLabel={"..."}
                className="react-paginate"
                marginPagesDisplayed={2}
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={1}
                forcePage={currentPage - 1}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogsLayout;

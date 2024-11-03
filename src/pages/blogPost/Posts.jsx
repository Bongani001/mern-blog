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
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  const [searchParams] = useSearchParams();

  const { setSelectedPage } = useContext(NavbarContext);
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedPage("blogs");
    const category = searchParams.get("category");
    // const getCategories = async () => {
    //   const data = await getAllCategories();
    //   if (data === "Network Error") {
    //     navigate("/serverdown");
    //   }
    //   setCategories(data);
    // };
    const getPosts = async () => {
      setIsLoadingPosts(false);
      // Get the categories
      const categoriesData = await getAllCategories();

      // Get posts
      let data = [];
      if (category == "all") {
        data = await getLatestPosts(10); // Get all posts (argument=number of posts to fetch)
      } else {
        const categoryId = selectedCategory._id;
        data = await getPostsByCategory(categoryId, 10); // Get posts by category (arguments=(category id, number of posts to fetch))
      }
      let top = await getMostViewedPosts(10); // Get top picks (argument=number of posts to fetch)
      if (
        data === "Network Error" ||
        top === "Network Error" ||
        categoriesData === "Network Error"
      ) {
        navigate("/serverdown");
      }

      setCategories(categoriesData);
      setPosts(data);
      setTopPosts(top);
      setIsLoadingPosts(false);
    };

    getPosts();
  }, [selectedCategory]);

  return (
    <>
      <BlogsLayout
        posts={posts}
        topPosts={topPosts}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isLoadingPosts={isLoadingPosts}
        categories={categories}
        mostViewed="Top Picks"
        mainTitle="Blogs"
      />
      {/* <div className="md:grid md:grid-cols-4 min-h-[70dvh] pt-20 pb-8 px-3">
        {posts && (
          <>
            <div className="hidden md:block h-fit bg-white/70 rounded-xl col-span-1 px-3 py-2 shadow border-r-zinc-300">
              <h2 className="text-zinc-800 text-2xl font-semibold">
                Top Picks
              </h2>
              <div className="">
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
                Blogs
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
                {isLoadingPosts && (
                  <div className="flex sm:col-span-2 lg:col-span-3 justify-center">
                    <img src={loading} alt="loading..." className="w-20" />
                  </div>
                )}
                {posts?.length && !isLoadingPosts < 1 && (
                  <span className="flex italic sm:col-span-2 lg:col-span-3 justify-center">
                    No blog posts available.
                  </span>
                )}
                {posts?.map((post) => {
                  return <PostCard key={post._id} post={post} date={true} />;
                })}
                {posts?.map((post) => {
                  return <PostCard key={post._id} post={post} date={true} />;
                })}
                {posts?.map((post) => {
                  return <PostCard key={post._id} post={post} date={true} />;
                })}
              </div>
            </div>
          </>
        )}
      </div> */}
      <ScrollToTop />
    </>
  );
};

export default Posts;

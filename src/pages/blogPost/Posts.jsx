import React, { useEffect, useState } from "react";
import headerImg from "../../assets/defaultHeaderImg.jpg";
import userImg from "../../assets/userImg.png";
import loading from "../../assets/three.gif";
import { getLatestPosts, getMostViewedPosts } from "../../services/posts";
import PostCard from "../../components/PostCard";
import { Link } from "react-router-dom";
import ScrollToTop from "../../components/ScrollToTop";
import BlogsLayout from "../../components/BlogsLayout";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [topPosts, setTopPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      let data = await getLatestPosts(10); // Get all posts (parameter=number of posts to fetch)
      let top = await getMostViewedPosts(10); // Get top picks (parameter=number of posts to fetch)
      if (data === "Network Error" || top === "Network Error") {
        navigate("/serverdown");
      }
      setPosts(data);
      setTopPosts(top);
      setIsLoadingPosts(false);
    };

    getPosts();
  }, []);

  return (
    <>
      <BlogsLayout
        posts={posts}
        topPosts={topPosts}
        isLoadingPosts={isLoadingPosts}
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

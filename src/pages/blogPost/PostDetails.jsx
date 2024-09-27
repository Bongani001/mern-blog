import React, { useEffect, useState } from "react";
import headerImg from "../../assets/defaultHeaderImg.jpg";
import userImg from "../../assets/userImg.png";
import loading from "../../assets/three.gif";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMostViewedPosts, getOnePost } from "../../services/posts";

const PostDetails = () => {
  const [post, setPosts] = useState(null);
  const [topPosts, setTopPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const getPosts = async (id) => {
      let data = await getOnePost(id); // Get the main post
      let top = await getMostViewedPosts(3); // get top picks
      setPosts(data);
      setTopPosts(top);
      setIsLoading(false);
    };

    getPosts(id);
  }, [id]);

  return (
    <div className="pt-24 mx-2 md:p-10 md:pt-24 min-h-dvh">
      {isLoading && (
        <div className="flex justify-center">
          <img src={loading} alt="loading..." className="w-20" />
        </div>
      )}

      {post && (
        <div className=" md:grid md:grid-cols-3">
          <div className="md:border-r md:border-zinc-300 md:pr-5 md:col-span-2">
            <h1 className="text-zinc-800 text-3xl font-semibold sm:text-[3rem] leading-tight">
              {post.title}
            </h1>
            <img
              src={post.headerImg || headerImg}
              alt="Header"
              className="h-80 sm:h-96 w-full rounded my-5"
            />
            <div className="flex justify-between items-center my-3  ">
              <div className="flex items-center gap-3">
                <img
                  src={userImg}
                  alt="User profile"
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <p className="text-zinc-7 00 text-sm">Written by</p>
                  <p className="text-zinc-900 text-lg font-semibold">
                    {post.authorId.username}
                  </p>
                </div>
              </div>
              <p className="text-xs sm:text-sm">
                Updated: {new Date(post.updatedAt).toLocaleDateString()}
              </p>
            </div>
            <main className="px-3">{post.content}</main>
          </div>
          <div className="hidden md:block">
            <p className="text-zinc-600 text-2xl border-b border-zinc-300 mb-3 p-4">
              Get the latest news from our website that interests you.
            </p>

            <div className="px-5">
              <h2 className="text-zinc-800 text-2xl font-semibold">
                Top Picks
              </h2>
              <div className="">
                {topPosts?.map((post) => {
                  return (
                    <div
                      key={post._id}
                      className="flex gap-3 border-b border-zinc-300 py-3 md:flex-col"
                    >
                      <img
                        src={post.headerImg || headerImg}
                        onClick={() => navigate(`/posts/${post._id}`)}
                        alt="User profile"
                        className="h-24 md:h-44 lg:h-52 min-w-[35%] md:w-full rounded-2xl hover:cursor-pointer"
                      />
                      <div className="col-span-2 md:flex md:flex-col md:justify-between md:h-full">
                        <div className="flex items-center gap-2 w-auto md:order-1">
                          <img
                            src={userImg}
                            alt="User profile"
                            className="h-9 w-9 rounded-full"
                          />
                          <p className="text-zinc-500 text-base">
                            {post.authorId.username}
                          </p>
                        </div>
                        <div className="">
                          <Link to={`/posts/${post._id}`}>
                            <h3 className="text-zinc-800 text-lg font-semibold line-clamp-2 mt-1 md:text-xl">
                              {post.title}
                            </h3>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;

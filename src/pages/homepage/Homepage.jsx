import React, { useEffect, useState } from "react";
import headerImg from "../../assets/defaultHeaderImg.jpg";
import userImg from "../../assets/userImg.png";
import { getLatestPosts, getMostViewedPosts } from "../../services/posts";
import { Link, useNavigate } from "react-router-dom";
import ScrollToTop from "../../components/ScrollToTop";
import PostCard from "../../components/PostCard";
import loading from "../../assets/three.gif";

const Homepage = () => {
  const [latestPosts, setLatestPosts] = useState([]);
  const [mostViewedPosts, setMostViewedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getLatest = async () => {
      setIsLoading(true);
      let data = await getLatestPosts(8);
      let viewed = await getMostViewedPosts(3);
      if (data === "Network Error") {
        navigate("/serverdown");
      }
      setLatestPosts(data);
      setMostViewedPosts(viewed);
      setIsLoading(false);
    };

    getLatest();
  }, []);

  return (
    <div className="bg-zinc-50 min-h-[80vh]">
      {isLoading ? (
        <div className="flex sm:col-span-2 lg:col-span-3 justify-center p-16 md:p-10 md:pt-24">
          <img src={loading} alt="loading..." className="w-20" />
        </div>
      ) : (
        <>
          <header className="bg-zinc-800 pb-16 md:flex sm:pb-0 ">
            <div
              style={{
                backgroundImage: `url(${
                  latestPosts[0].headerImg || headerImg
                })`,
              }}
              className="h-96 md:h-[500px] w-full md:min-w-[50%] bg-cover sm:order-1"
            >
              <div className="h-full w-full bg-black/10"></div>
            </div>
            <div className="bg-zinc-800 p-4 sm:p-5 md:p-10 md:pt-24 md:min-w-[50%]">
              <div className="flex flex-col gap-2">
                <pre className="text-white">Newest Blog</pre>
                <h1 className="text-3xl text-zinc-200 font-semibold">
                  {latestPosts[0].title}
                </h1>
                <div
                  dangerouslySetInnerHTML={{ __html: latestPosts[0].content }}
                  className="text-zinc-300 line-clamp-3"
                />
                <button
                  type="button"
                  onClick={() => navigate(`/posts/${latestPosts[0]._id}`)}
                  className="bg-zinc-100 font-semibold rounded-3xl self-start py-2 px-3"
                >
                  Read More
                </button>
              </div>
              <div className="flex items-center gap-3 mt-10">
                <img
                  src={userImg}
                  alt="User profile"
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <p className="text-zinc-300 text-sm">Written by</p>
                  <p className="text-zinc-200 text-lg font-semibold">
                    {latestPosts[0].authorId.username}
                  </p>
                </div>
              </div>
            </div>
          </header>
          <main className="bg-zinc-50 rounded-2xl py-5 mx-4 relative -top-14">
            <h2
              className="text-zinc-800 text-2xl font-semibold ml-3"
              onClick={() => navigate("/topposts")}
            >
              Top Blogs
            </h2>
            {latestPosts.length > 2 && (
              <div className="flex overflow-x-auto md:grid md:grid-cols-2 md:grid-flow-row gap-3 my-3 overflow-hidden">
                <div className="md:row-span-2">
                  <div
                    style={{
                      backgroundImage: `url(${
                        mostViewedPosts[0].headerImg || headerImg
                      })`,
                    }}
                    className="h-48 w-72 md:min-h-[60%] md:w-full bg-cover rounded-2xl"
                  >
                    <Link to={`posts/${mostViewedPosts[0]._id}`}>
                      <div className="h-full w-full rounded-2xl hover:bg-black/50 "></div>
                    </Link>
                  </div>
                  <div className="md:flex md:flex-col md:gap-2">
                    <div className="flex items-center gap-1 md:order-1">
                      <img
                        src={userImg}
                        alt="User profile"
                        className="h-12 w-12 rounded-full"
                      />
                      <p className="text-zinc-500 text-base">
                        {mostViewedPosts[0].authorId.username}
                      </p>
                    </div>
                    <div className="">
                      <Link to={`posts/${mostViewedPosts[0]._id}`}>
                        <h4 className="text-zinc-800 font-semibold md:text-xl md:my-2">
                          {mostViewedPosts[0].title}
                        </h4>
                      </Link>

                      <div
                        dangerouslySetInnerHTML={{
                          __html: mostViewedPosts[0].content,
                        }}
                        className="text-zinc-500 text-sm line-clamp-2 lg:line-clamp-3"
                      />
                    </div>
                  </div>
                </div>
                <div className="md:flex md:gap-3 ">
                  <div
                    style={{
                      backgroundImage: `url(${
                        mostViewedPosts[1].headerImg || headerImg
                      })`,
                    }}
                    className="h-48 w-80 md:min-w-[35%] bg-cover rounded-2xl "
                  >
                    <Link to={`posts/${mostViewedPosts[1]._id}`}>
                      <div className="h-full w-full rounded-2xl hover:bg-black/50"></div>
                    </Link>
                  </div>
                  <div className="md:flex md:flex-col md:justify-between">
                    <div className="flex items-center gap-1 md:order-1">
                      <img
                        src={userImg}
                        alt="User profile"
                        className="h-12 w-12 rounded-full"
                      />
                      <p className="text-zinc-500 text-base">
                        {mostViewedPosts[1].authorId.username}
                      </p>
                    </div>
                    <div className="">
                      <Link to={`posts/${mostViewedPosts[1]._id}`}>
                        <h4 className="text-zinc-800 font-semibold md:text-xl md:mb-2 ">
                          {mostViewedPosts[1].title}
                        </h4>
                      </Link>

                      <div
                        dangerouslySetInnerHTML={{
                          __html: mostViewedPosts[1].content,
                        }}
                        className="text-zinc-500 text-sm line-clamp-2 md:line-clamp-3"
                      />
                    </div>
                  </div>
                </div>
                <div className="md:flex md:gap-3">
                  <div
                    style={{
                      backgroundImage: `url(${
                        mostViewedPosts[2].headerImg || headerImg
                      })`,
                    }}
                    className="h-48 w-80 md:min-w-[35%] bg-cover rounded-2xl"
                  >
                    <Link to={`posts/${mostViewedPosts[2]._id}`}>
                      <div className="h-full w-full rounded-2xl hover:bg-black/50"></div>
                    </Link>
                  </div>
                  <div className="md:flex md:flex-col md:justify-between">
                    <div className="flex items-center gap-1 md:order-1">
                      <img
                        src={userImg}
                        alt="User profile"
                        className="h-12 w-12 rounded-full"
                      />
                      <p className="text-zinc-500 text-base">
                        {mostViewedPosts[2].authorId.username}
                      </p>
                    </div>
                    <div className="">
                      <Link to={`posts/${mostViewedPosts[0]._id}`}>
                        <h4 className="text-zinc-800 font-semibold md:text-xl md:mb-2 ">
                          {mostViewedPosts[2].title}
                        </h4>
                      </Link>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: mostViewedPosts[2].content,
                        }}
                        className="text-zinc-500 text-sm line-clamp-2 md:line-clamp-3"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <section className="">
              <h2 className="text-zinc-800 text-2xl font-semibold my-4">
                Latest Blog
              </h2>
              <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {latestPosts?.map((post) => {
                  return <PostCard key={post._id} post={post} />;
                })}
              </div>
            </section>
          </main>{" "}
        </>
      )}

      <ScrollToTop />
    </div>
  );
};

export default Homepage;

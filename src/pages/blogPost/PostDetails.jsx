import React, { useContext, useEffect, useState } from "react";
import headerImg from "../../assets/defaultHeaderImg.jpg";
import userImg from "../../assets/userImg.png";
import loading from "../../assets/three.gif";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMostViewedPosts, getOnePost } from "../../services/posts";
import ScrollToTop from "../../components/ScrollToTop";
import {
  deleteComment,
  getAllPostComments,
  postComment,
} from "../../services/commets";
import { AuthContext } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { NavbarContext } from "../../context/NavbarContext";

const PostDetails = () => {
  const [post, setPosts] = useState(null);
  const [topPosts, setTopPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  const { id } = useParams();

  const { user } = useContext(AuthContext);
  const { setSelectedPage } = useContext(NavbarContext);

  const navigate = useNavigate();

  useEffect(() => {
    setSelectedPage("blogs");
    const getPosts = async (id) => {
      let data = await getOnePost(id); // Get the main post
      let top = await getMostViewedPosts(3); // Get top picks
      let comm = await getAllPostComments(id); // Get all comments related to the post
      if (data === "Network Error") {
        navigate("/serverdown");
      }

      setPosts(data);
      setTopPosts(top);
      setComments(comm);
      setIsLoading(false);
    };

    getPosts(id);
  }, [id]);

  const handleCommentSubmit = async () => {
    if (user?.token) {
      setSubmittingComment(true);
      let data = await postComment(
        { postId: id, content: comment },
        user.token
      );
      if (data === "Network Error") {
        toast.error("Server error, come back later.");
        setSubmittingComment(false);

        return;
      } else if (data?.errors) {
        data.errors.forEach((err) => {
          if (err.type) {
            toast.error(err.msg);
          }
        });
        setSubmittingComment(false);
        return;
      }
      toast.success("Comment successful.");
      let comm = await getAllPostComments(id); // Get all comments related to the post
      if (comm === "Network Error") {
        setSubmittingComment(false);
        navigate("/serverdown");
      }
      setComments(comm);
      setComment("");
      setSubmittingComment(false);
    } else {
      toast.error("You must be logged in to comment.");
    }
  };

  const handleCommentDelete = async (commentId) => {
    const data = await deleteComment(commentId, user.token);

    if (data === "Network Error") {
      toast.error("Server error, come back later.");
      return;
    } else if (data?.errors) {
      data.errors.forEach((err) => {
        toast.error(err.msg);
        setUser(null);
        localStorage.removeItem("userInfo");
        navigate("/");
      });
      return;
    } else if (data === undefined) {
      toast.error("Server error, come back later.");
      return;
    }
    let comm = await getAllPostComments(id); // Get all comments related to the post
    if (comm === "Network Error") {
      navigate("/serverdown");
    }
    setComments(comm);
    toast.success("Comment deleted successfully.");
  };

  return (
    <div className="pt-20 mx-2 md:p-10 md:pt-20 min-h-dvh">
      <Toaster position="top-center" reverseOrder={false} />
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
              className="h-80 sm:h-96 w-full object-cover rounded my-5"
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
            <main
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="px-3"
            ></main>
            <div className="border-t border-zinc-400 pt-3 my-12 ">
              <h2 className="text-zinc-800 text-center font-medium">
                Comments
              </h2>
              <div className="flex">
                <label className="flex-1">
                  <textarea
                    name="comment"
                    id="comment"
                    rows="2"
                    placeholder="Write your comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full outline-none p-1"
                  ></textarea>
                </label>
                {submittingComment ? (
                  <button
                    type="submit"
                    className="bg-blue-500 self-center text-white text-xs font-semibold rounded-lg px-3 py-2 m-3"
                  >
                    Loading...
                  </button>
                ) : (
                  <button
                    onClick={handleCommentSubmit}
                    type="submit"
                    className="bg-blue-500 self-center text-white text-xs font-semibold rounded-lg px-3 py-2 m-3"
                  >
                    Submit
                  </button>
                )}
              </div>
              <div className="mt-2 space-y-2">
                {comments?.length < 1 && (
                  <p className="text-zinc-500 text-base italic">
                    there are no comments for this blog
                  </p>
                )}
                {comments?.map((comment) => {
                  return (
                    <div key={comment._id} className="flex items-center gap-2">
                      <img
                        src={userImg}
                        alt="User profile"
                        className="h-6 w-6 rounded-full self-start"
                      />
                      <div className="bg-white rounded p-1">
                        <div className="flex gap-1 items-center">
                          <p className="text-zinc-500 text-base">
                            {comment.authorId.username}
                          </p>
                          &#x2022;{" "}
                          <p className="text-zinc-500 text-base">
                            {new Date(comment.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <p>{comment.content}</p>
                        {comment.authorId._id === user?._id && (
                          <div className="flex justify-end">
                            <button
                              onClick={() =>
                                handleCommentDelete(comment._id, user.token)
                              }
                              type="button"
                              className="bg-red-500 text-white text-xs font-semibold rounded-lg px-3 py-2 m-1 hover:cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
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
      <ScrollToTop />
    </div>
  );
};

export default PostDetails;

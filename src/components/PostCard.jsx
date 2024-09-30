import React, { useContext } from "react";
import headerImg from "../assets/defaultHeaderImg.jpg";
import userImg from "../assets/userImg.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PostCard = ({ post, date }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div key={post._id} className="flex bg-white shadow-md gap-3 md:flex-col ">
      <div
        onClick={() => navigate(`/posts/${post._id}`)}
        style={{
          backgroundImage: `url(${post.headerImg || headerImg})`,
        }}
        className="min-h-24 min-w-36 md:min-h-52  bg-cover hover:cursor-pointer transition ease-in-out duration-300 hover:scale-105"
      ></div>
      <div className="px-4 py-2 sm:py-0 md:flex md:flex-col md:justify-between md:h-full">
        {!date && (
          <div className="flex items-center w-auto md:order-1">
            <img
              src={userImg}
              alt="User profile"
              className="h-6 w-6 md:h-12 md:w-12 rounded-full"
            />
            <p className="text-zinc-500 text-sm md:text-base">
              {post.authorId.username}
            </p>
          </div>
        )}
        <div className="">
          {date && (
            <div className="flex items-center justify-between">
              <span className="text-zinc-500 text-sm">
                {new Date(post.createdAt).toDateString()}
              </span>
              {post.authorId._id === user._id && (
                <button
                  type="button"
                  className="self-end bg-blue-500 sm:hidden text-white text-xs rounded-lg px-3 py-2 ml-3"
                >
                  Edit
                </button>
              )}
            </div>
          )}
          <Link to={`/posts/${post._id}`}>
            <h3 className="text-zinc-800 text-base font-semibold line-clamp-3 md:line-clamp-2 mt-1 md:text-xl">
              {post.title}
            </h3>
          </Link>

          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="text-zinc-500 text-sm hidden md:static md:line-clamp-2 md:my-2"
          />
        </div>
        {post.authorId._id === user._id && date && (
          <Link to={`/authors/${user._id}/edit?blog=${post.authorId._id}`}>
            <button
              type="button"
              className="self-end bg-blue-500 hidden sm:block text-white text-xs rounded-lg px-3 py-2 m-3 ml-0 md:order-2"
            >
              Edit
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default PostCard;

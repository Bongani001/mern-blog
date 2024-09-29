import React from "react";
import headerImg from "../assets/defaultHeaderImg.jpg";
import userImg from "../assets/userImg.png";
import { Link, useNavigate } from "react-router-dom";

const PostCard = ({ post, date }) => {
  const navigate = useNavigate();

  return (
    <div key={post._id} className="flex gap-3 md:flex-col">
      <div
        onClick={() => navigate(`/posts/${post._id}`)}
        style={{
          backgroundImage: `url(${post.headerImg || headerImg})`,
        }}
        className="min-h-24 min-w-36 md:min-h-52 rounded-2xl bg-cover transition ease-in-out duration-300 hover:scale-105 hover:cursor-pointer"
      >
        {/* <img
          src={post.headerImg || headerImg}
          onClick={() => navigate(`/posts/${post._id}`)}
          alt="header"
          className="h-full w-full rounded-2xl"
        /> */}
      </div>
      <div className="col-span-2 md:flex md:flex-col md:justify-between md:h-full">
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
            <span className="text-zinc-500 text-sm">
              {new Date(post.createdAt).toDateString()}
            </span>
          )}
          <Link to={`/posts/${post._id}`}>
            <h3 className="text-zinc-800 text-base font-semibold line-clamp-3 md:line-clamp-2 mt-1 md:text-xl">
              {post.title}
            </h3>
          </Link>

          <p className="text-zinc-500 text-sm hidden md:static md:line-clamp-2 md:my-2">
            {post.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

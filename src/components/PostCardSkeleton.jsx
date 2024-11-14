import React from "react";

const PostCardSkeleton = () => {
  return (
    <div className="animate-pulse flex md:flex-col ">
      <div className="bg-zinc-300 rounded-xl min-h-24 min-w-36 md:min-h-40 lg:min-h-52"></div>
      <div className="px-2 md:px-0 sm:mt-3 md:flex md:flex-col md:justify-between md:h-full w-full">
        <div className="flex items-center w-auto md:order-1 mb-2 md:m-0">
          <div className="bg-zinc-300 h-6 w-6 md:h-10 md:w-10 rounded-full mr-2"></div>
          <p className="bg-zinc-300 h-3 w-[20%] rounded-xl text-zinc-500 text-sm md:text-base"></p>
        </div>

        <div className="">
          <h1 className="bg-zinc-300 h-3 w-[60%] rounded-xl text-zinc-500 text-sm"></h1>
          <h3 className="bg-zinc-300 h-3 w-[40%] rounded-xl text-zinc-800 text-sm font-semibold line-clamp-3 md:line-clamp-2 mt-1 md:text-lg"></h3>

          <div className="bg-zinc-300 h-3 w-[100%] rounded-xl text-zinc-500 hidden md:block my-1" />
          <div className="bg-zinc-300 h-3 w-[100%] rounded-xl text-zinc-500 text-sm hidden md:block my-2" />
        </div>

        <div className="flex justify-between items-center">
          <p
            className={`bg-zinc-300 h-3 w-[60%] rounded-xl text-black text-sm italic`}
          ></p>
          <button
            type="button"
            className="bg-zinc-300 h-3 w-[20%]  text-white text-xs rounded-lg px-3 py-2 md:order-2"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default PostCardSkeleton;

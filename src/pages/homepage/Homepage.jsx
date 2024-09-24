import React from "react";
import headerImg from "../../assets/clouds.jpg";
import userImg from "../../assets/userImg.png";

const Homepage = () => {
  return (
    <div className="bg-zinc-50">
      <header className="bg-zinc-800 pb-16">
        <div
          style={{ backgroundImage: `url(${headerImg})` }}
          className="h-80 w-full bg-cover"
        ></div>
        <div className="bg-zinc-800 p-3">
          <div className="flex flex-col gap-2">
            <pre className="text-white">Newest Blog</pre>
            <h1 className="text-3xl text-zinc-200 font-semibold">
              The Art of Home Transformation
            </h1>
            <p className="text-zinc-300">
              Explore innovative ideas and trendy decor to elevate your living
              spaces. Dive into the world of home transformation with Homespace!
            </p>
            <button className="bg-zinc-100 font-semibold rounded-3xl self-start py-2 px-3">
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
                Peter Haaland
              </p>
            </div>
          </div>
        </div>
      </header>
      <main className="bg-zinc-50 rounded-2xl py-5 -mt-14 mx-4">
        <h2 className="text-zinc-800 text-2xl font-semibold ml-3">Top Blogs</h2>
        <div className="flex overflow-x-auto gap-3 my-3">
          <div className="">
            <div
              style={{ backgroundImage: `url(${headerImg})` }}
              className="h-48 w-72 bg-cover rounded-2xl"
            ></div>
            <div className="mt-2">
              <div className="flex items-center gap-2">
                <img
                  src={userImg}
                  alt="User profile"
                  className="h-6 w-6 rounded-full"
                />
                <p className="text-zinc-500 text-sm">Peter Haaland</p>
              </div>
              <h4 className="text-zinc-800 font-semibold">
                Tech Marvels for Your Home
              </h4>
              <p className="text-zinc-500 text-sm line-clamp-2">
                Dicover the cutting-edge technologies that are reshaping homes.
                From smart appliances to integrated systems, find the perfect
                tech solutions at Homespace.
              </p>
            </div>
          </div>
          <div className="">
            <div
              style={{ backgroundImage: `url(${headerImg})` }}
              className="h-48 w-80 bg-cover rounded-2xl"
            ></div>
            <div className="">
              <div className="flex items-center gap-2">
                <img
                  src={userImg}
                  alt="User profile"
                  className="h-12 w-12 rounded-full"
                />
                <p className="text-zinc-500 text-base">Peter Haaland</p>
              </div>
              <h4 className="text-zinc-800 font-semibold">
                Tech Marvels for Your Home
              </h4>
              <p className="text-zinc-500 text-base line-clamp-2">
                Dicover the cutting-edge technologies that are reshaping homes.
                From start appliances to integrated systems, find the perfect
                tech solutions at Homespace.
              </p>
            </div>
          </div>
          <div className="">
            <div
              style={{ backgroundImage: `url(${headerImg})` }}
              className="h-48 w-80 bg-cover rounded-2xl"
            ></div>
            <div className="">
              <div className="flex items-center gap-2">
                <img
                  src={userImg}
                  alt="User profile"
                  className="h-12 w-12 rounded-full"
                />
                <p className="text-zinc-500 text-base">Peter Haaland</p>
              </div>
              <h4 className="text-zinc-800 font-semibold">
                Tech Marvels for Your Home
              </h4>
              <p className="text-zinc-500 text-base line-clamp-2">
                Dicover the cutting-edge technologies that are reshaping homes.
                From start appliances to integrated systems, find the perfect
                tech solutions at Homespace.
              </p>
            </div>
          </div>
        </div>

        <section className="">
          <h2 className="text-zinc-800 text-2xl font-semibold my-4">
            Latest Blog
          </h2>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-3">
              <img
                src={headerImg}
                alt="User profile"
                className="h-24 w-full rounded-2xl"
              />
              <div className="col-span-2">
                <div className="flex items-center w-auto">
                  <img
                    src={userImg}
                    alt="User profile"
                    className="h-6 w-6 rounded-full"
                  />
                  <p className="text-zinc-500 text-sm">Peter Haaland</p>
                </div>
                <p className="text-zinc-800 text-lg font-semibold line-clamp-2 mt-1">
                  Eco-Friendly Living: Sustainable Choices for a Greener Home
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <img
                src={headerImg}
                alt="User profile"
                className="h-24 w-full rounded-2xl"
              />
              <div className="col-span-2">
                <div className="flex items-center w-auto">
                  <img
                    src={userImg}
                    alt="User profile"
                    className="h-6 w-6 rounded-full"
                  />
                  <p className="text-zinc-500 text-sm">Peter Haaland</p>
                </div>
                <p className="text-zinc-800 text-lg font-semibold line-clamp-2 mt-1">
                  Eco-Friendly Living: Sustainable Choices for a Greener Home
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <img
                src={headerImg}
                alt="User profile"
                className="h-24 w-full rounded-2xl"
              />
              <div className="col-span-2">
                <div className="flex items-center w-auto">
                  <img
                    src={userImg}
                    alt="User profile"
                    className="h-6 w-6 rounded-full"
                  />
                  <p className="text-zinc-500 text-sm">Peter Haaland</p>
                </div>
                <p className="text-zinc-800 text-lg font-semibold line-clamp-2 mt-1">
                  Eco-Friendly Living: Sustainable Choices for a Greener Home
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <img
                src={headerImg}
                alt="User profile"
                className="h-24 w-full rounded-2xl"
              />
              <div className="col-span-2">
                <div className="flex items-center w-auto">
                  <img
                    src={userImg}
                    alt="User profile"
                    className="h-6 w-6 rounded-full"
                  />
                  <p className="text-zinc-500 text-sm">Peter Haaland</p>
                </div>
                <p className="text-zinc-800 text-lg font-semibold line-clamp-2 mt-1">
                  Eco-Friendly Living: Sustainable Choices for a Greener Home
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Homepage;

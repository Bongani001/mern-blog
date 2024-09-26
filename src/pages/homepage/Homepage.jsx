import React from "react";
import headerImg from "../../assets/clouds.jpg";
import userImg from "../../assets/userImg.png";

const Homepage = () => {
  return (
    <div className="bg-zinc-50">
      <header className="bg-zinc-800 pb-16 md:flex sm:pb-0 ">
        <div
          style={{ backgroundImage: `url(${headerImg})` }}
          className="h-96 md:h-[500px] w-full md:min-w-[50%] bg-cover sm:order-1"
        ></div>
        <div className="bg-zinc-800 p-4 sm:p-5 md:p-10 md:pt-24 md:min-w-[50%]">
          <div className="flex flex-col gap-2">
            <pre className="text-white">Newest Blog</pre>
            <h1 className="text-3xl text-zinc-200 font-semibold">
              The Art of Home Transformation
            </h1>
            <p className="text-zinc-300 line-clamp-3">
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
      <main className="bg-zinc-50 rounded-2xl py-5 mx-4 relative -top-14">
        <h2 className="text-zinc-800 text-2xl font-semibold ml-3">Top Blogs</h2>
        <div className="flex overflow-x-auto md:grid md:grid-cols-2 md:grid-flow-row gap-3 my-3 overflow-hidden">
          <div className="md:row-span-2">
            <div
              style={{ backgroundImage: `url(${headerImg})` }}
              className="h-48 w-72 md:min-h-[60%] md:w-full bg-cover rounded-2xl"
            ></div>
            <div className="md:flex md:flex-col md:gap-2">
              <div className="flex items-center gap-1 md:order-1">
                <img
                  src={userImg}
                  alt="User profile"
                  className="h-12 w-12 rounded-full"
                />
                <p className="text-zinc-500 text-base">Peter Haaland</p>
              </div>
              <div className="">
                <h4 className="text-zinc-800 font-semibold md:text-xl md:my-2">
                  Tech Marvels for Your Home
                </h4>
                <p className="text-zinc-500 text-sm line-clamp-2 md:line-clamp-3">
                  Dicover the cutting-edge technologies that are reshaping
                  homes. From start appliances to integrated systems, find the
                  perfect tech solutions at Homespace.
                </p>
              </div>
            </div>
          </div>
          <div className="md:flex md:gap-3">
            <div
              style={{ backgroundImage: `url(${headerImg})` }}
              className="h-48 w-80 md:min-w-[35%] bg-cover rounded-2xl"
            ></div>
            <div className="md:flex md:flex-col md:justify-between">
              <div className="flex items-center gap-1 md:order-1">
                <img
                  src={userImg}
                  alt="User profile"
                  className="h-12 w-12 rounded-full"
                />
                <p className="text-zinc-500 text-base">Peter Haaland</p>
              </div>
              <div className="">
                <h4 className="text-zinc-800 font-semibold md:text-xl md:mb-2">
                  Tech Marvels for Your Home
                </h4>
                <p className="text-zinc-500 text-sm line-clamp-2 md:line-clamp-3">
                  Dicover the cutting-edge technologies that are reshaping
                  homes. From start appliances to integrated systems, find the
                  perfect tech solutions at Homespace.
                </p>
              </div>
            </div>
          </div>
          <div className="md:flex md:gap-3">
            <div
              style={{ backgroundImage: `url(${headerImg})` }}
              className="h-48 w-80 md:min-w-[35%] bg-cover rounded-2xl"
            ></div>
            <div className="md:flex md:flex-col md:justify-between">
              <div className="flex items-center gap-1 md:order-1">
                <img
                  src={userImg}
                  alt="User profile"
                  className="h-12 w-12 rounded-full"
                />
                <p className="text-zinc-500 text-base">Peter Haaland</p>
              </div>
              <div className="">
                <h4 className="text-zinc-800 font-semibold md:text-xl md:mb-2">
                  Tech Marvels for Your Home
                </h4>
                <p className="text-zinc-500 text-sm line-clamp-2 md:line-clamp-3">
                  Dicover the cutting-edge technologies that are reshaping
                  homes. From start appliances to integrated systems, find the
                  perfect tech solutions at Homespace.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="">
          <h2 className="text-zinc-800 text-2xl font-semibold my-4">
            Latest Blog
          </h2>
          <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 md:grid-cols-3">
            <div className="flex gap-3 md:flex-col">
              <img
                src={headerImg}
                alt="User profile"
                className="h-24 md:h-44 lg:h-52 min-w-[35%] md:w-full rounded-2xl"
              />
              <div className="col-span-2 md:flex md:flex-col">
                <div className="flex items-center w-auto md:order-1">
                  <img
                    src={userImg}
                    alt="User profile"
                    className="h-6 w-6 md:h-12 md:w-12 rounded-full"
                  />
                  <p className="text-zinc-500 text-sm md:text-base">
                    Peter Haaland
                  </p>
                </div>
                <div className="">
                  <h3 className="text-zinc-800 text-lg font-semibold line-clamp-2 mt-1 md:text-xl">
                    Eco-Friendly Living: Sustainable Choices for a Greener Home
                  </h3>
                  <p className="text-zinc-500 text-sm hidden md:static md:line-clamp-2 md:my-2">
                    Dicover the cutting-edge technologies that are reshaping
                    homes. From start appliances to integrated systems, find the
                    perfect tech solutions at Homespace.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 md:flex-col">
              <img
                src={headerImg}
                alt="User profile"
                className="h-24 md:h-44 lg:h-52 min-w-[35%] md:w-full rounded-2xl"
              />
              <div className="col-span-2 md:flex md:flex-col">
                <div className="flex items-center w-auto md:order-1">
                  <img
                    src={userImg}
                    alt="User profile"
                    className="h-6 w-6 md:h-12 md:w-12 rounded-full"
                  />
                  <p className="text-zinc-500 text-sm md:text-base">
                    Peter Haaland
                  </p>
                </div>
                <div className="">
                  <h3 className="text-zinc-800 text-lg font-semibold line-clamp-2 mt-1 md:text-xl">
                    Eco-Friendly Living: Sustainable Choices for a Greener Home
                  </h3>
                  <p className="text-zinc-500 text-sm hidden md:static md:line-clamp-2 md:my-2">
                    Dicover the cutting-edge technologies that are reshaping
                    homes. From start appliances to integrated systems, find the
                    perfect tech solutions at Homespace.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 md:flex-col">
              <img
                src={headerImg}
                alt="User profile"
                className="h-24 md:h-44 lg:h-52 min-w-[35%] md:w-full rounded-2xl"
              />
              <div className="col-span-2 md:flex md:flex-col">
                <div className="flex items-center w-auto md:order-1">
                  <img
                    src={userImg}
                    alt="User profile"
                    className="h-6 w-6 md:h-12 md:w-12 rounded-full"
                  />
                  <p className="text-zinc-500 text-sm md:text-base">
                    Peter Haaland
                  </p>
                </div>
                <div className="">
                  <h3 className="text-zinc-800 text-lg font-semibold line-clamp-2 mt-1 md:text-xl">
                    Eco-Friendly Living: Sustainable Choices for a Greener Home
                  </h3>
                  <p className="text-zinc-500 text-sm hidden md:static md:line-clamp-2 md:my-2">
                    Dicover the cutting-edge technologies that are reshaping
                    homes. From start appliances to integrated systems, find the
                    perfect tech solutions at Homespace.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 md:flex-col">
              <img
                src={headerImg}
                alt="User profile"
                className="h-24 md:h-44 lg:h-52 min-w-[35%] md:w-full rounded-2xl"
              />
              <div className="col-span-2 md:flex md:flex-col">
                <div className="flex items-center w-auto md:order-1">
                  <img
                    src={userImg}
                    alt="User profile"
                    className="h-6 w-6 md:h-12 md:w-12 rounded-full"
                  />
                  <p className="text-zinc-500 text-sm md:text-base">
                    Peter Haaland
                  </p>
                </div>
                <div className="">
                  <h3 className="text-zinc-800 text-lg font-semibold line-clamp-2 mt-1 md:text-xl">
                    Eco-Friendly Living: Sustainable Choices for a Greener Home
                  </h3>
                  <p className="text-zinc-500 text-sm hidden md:static md:line-clamp-2 md:my-2">
                    Dicover the cutting-edge technologies that are reshaping
                    homes. From start appliances to integrated systems, find the
                    perfect tech solutions at Homespace.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 md:flex-col">
              <img
                src={headerImg}
                alt="User profile"
                className="h-24 md:h-44 lg:h-52 min-w-[35%] md:w-full rounded-2xl"
              />
              <div className="col-span-2 md:flex md:flex-col">
                <div className="flex items-center w-auto md:order-1">
                  <img
                    src={userImg}
                    alt="User profile"
                    className="h-6 w-6 md:h-12 md:w-12 rounded-full"
                  />
                  <p className="text-zinc-500 text-sm md:text-base">
                    Peter Haaland
                  </p>
                </div>
                <div className="">
                  <h3 className="text-zinc-800 text-lg font-semibold line-clamp-2 mt-1 md:text-xl">
                    Eco-Friendly Living: Sustainable Choices for a Greener Home
                  </h3>
                  <p className="text-zinc-500 text-sm hidden md:static md:line-clamp-2 md:my-2">
                    Dicover the cutting-edge technologies that are reshaping
                    homes. From start appliances to integrated systems, find the
                    perfect tech solutions at Homespace.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 md:flex-col">
              <img
                src={headerImg}
                alt="User profile"
                className="h-24 md:h-44 lg:h-52 min-w-[35%] md:w-full rounded-2xl"
              />
              <div className="col-span-2 md:flex md:flex-col">
                <div className="flex items-center w-auto md:order-1">
                  <img
                    src={userImg}
                    alt="User profile"
                    className="h-6 w-6 md:h-12 md:w-12 rounded-full"
                  />
                  <p className="text-zinc-500 text-sm md:text-base">
                    Peter Haaland
                  </p>
                </div>
                <div className="">
                  <h3 className="text-zinc-800 text-lg font-semibold line-clamp-2 mt-1 md:text-xl">
                    Eco-Friendly Living: Sustainable Choices for a Greener Home
                  </h3>
                  <p className="text-zinc-500 text-sm hidden md:static md:line-clamp-2 md:my-2">
                    Dicover the cutting-edge technologies that are reshaping
                    homes. From start appliances to integrated systems, find the
                    perfect tech solutions at Homespace.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Homepage;

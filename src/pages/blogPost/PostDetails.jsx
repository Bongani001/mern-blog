import React from "react";
import headerImg from "../../assets/defaultHeaderImg.jpg";
import userImg from "../../assets/userImg.png";

const PostDetails = () => {
  return (
    <div className="pt-24 mx-2 md:p-10 md:pt-24">
      <div className=" md:grid md:grid-cols-3">
        <div className="md:border-r md:border-zinc-300 md:pr-5 md:col-span-2">
          <h1 className="text-zinc-800 text-3xl font-semibold sm:text-[3rem] leading-tight">
            Will AI replace UX copywriting? Here's what the data says.
          </h1>
          <img
            src={headerImg}
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
                  Will Marth
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm">Updated: 27-04-2024</p>
          </div>
          <main className="px-3">
            <section>
              <h2>Introduction</h2>
              <p>
                In recent years, artificial intelligence (AI) has made
                significant strides in content generation. From writing news
                articles to creating poems, AI models have demonstrated their
                ability to produce human-quality text. However, one area that
                has remained relatively untouched by AI is UX copywriting. This
                blog post will explore whether AI can truly replace human UX
                copywriters and what the future holds for this critical role.
              </p>
            </section>
            <section>
              <h2>The Rise of AI in Content Creation</h2>
              <p>
                AI models like GPT-3 have shown remarkable capabilities in
                generating coherent and informative text. They can understand
                context, follow instructions, and even write creative content.
                This has led many to question whether AI could eventually
                replace human writers altogether.
              </p>
              <p>
                While AI has made significant progress, it still has
                limitations. For example, AI models can struggle with nuance,
                cultural understanding, and emotional intelligence. These are
                all essential qualities for effective UX copywriting.
              </p>
            </section>
            <section>
              <h2>The Unique Role of UX Copywriting</h2>
              <p>
                UX copywriting is more than just writing words. It involves
                understanding user needs, crafting persuasive messages, and
                guiding users through a product or service. UX copywriters need
                to be empathetic, creative, and have a deep understanding of
                human psychology.
              </p>
              <p>
                AI models can generate text, but they cannot truly understand
                the human experience. They lack the ability to empathize with
                users, anticipate their needs, and tailor messages to specific
                audiences.
              </p>
            </section>
            <section>
              <h2>AI's Limitations in UX Copywriting</h2>
              <p>
                While AI can generate text, it often struggles with the
                following aspects of UX copywriting:
              </p>
              <ul>
                <li>
                  <strong>Empathy:</strong> AI models cannot truly understand
                  human emotions or experiences.
                </li>
                <li>
                  <strong>Nuance:</strong> AI can sometimes generate text that
                  is overly generic or lacks nuance.
                </li>
                <li>
                  <strong>Cultural understanding:</strong> AI may not be able to
                  understand cultural nuances or sensitivities.
                </li>
                <li>
                  <strong>Emotional intelligence:</strong> AI lacks the ability
                  to recognize and respond to emotions.
                </li>
              </ul>
            </section>
            <section>
              <h2>The Future of AI and UX Copywriting</h2>
              <p>
                While AI is unlikely to completely replace UX copywriters, it
                can be a valuable tool. AI can be used to generate initial
                drafts, provide ideas, and even translate content into different
                languages. However, human copywriters will still be needed to
                ensure that the content is engaging, persuasive, and tailored to
                the specific needs of the target audience.
              </p>
              <p>
                In the future, we may see a collaboration between AI and human
                copywriters, with AI providing support and automation while
                human copywriters focus on the more creative and strategic
                aspects of UX copywriting.
              </p>
            </section>
          </main>
        </div>
        <div className="hidden md:block">
          <p className="text-zinc-600 text-2xl border-b border-zinc-300 mb-3 p-4">
            Get the latest news from our website that interests you.
          </p>

          <div className="px-5">
            <h2 className="text-zinc-800 text-2xl font-semibold">Top Picks</h2>
            <div className="">
              <div className="flex gap-3 border-b border-zinc-300 py-3 md:flex-col">
                <img
                  src={headerImg}
                  alt="User profile"
                  className="h-24 md:h-44 lg:h-52 min-w-[35%] md:w-full rounded-2xl"
                />
                <div className="col-span-2 md:flex md:flex-col md:justify-between md:h-full">
                  <div className="flex items-center gap-2 w-auto md:order-1">
                    <img
                      src={userImg}
                      alt="User profile"
                      className="h-9 w-9 rounded-full"
                    />
                    <p className="text-zinc-500 text-base">Mark Stern</p>
                  </div>
                  <div className="">
                    <h3 className="text-zinc-800 text-lg font-semibold line-clamp-2 mt-1 md:text-xl">
                      Does it Also do the Same Thing as Others? We Shall See
                    </h3>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 border-b border-zinc-300 py-3 md:flex-col">
                <img
                  src={headerImg}
                  alt="User profile"
                  className="h-24 md:h-44 lg:h-52 min-w-[35%] md:w-full rounded-2xl"
                />
                <div className="col-span-2 md:flex md:flex-col md:justify-between md:h-full">
                  <div className="flex items-center w-auto md:order-1">
                    <img
                      src={userImg}
                      alt="User profile"
                      className="h-6 w-6 md:h-12 md:w-12 rounded-full"
                    />
                    <p className="text-zinc-500 text-sm md:text-base">
                      Mark Stern
                    </p>
                  </div>
                  <div className="">
                    <h3 className="text-zinc-800 text-lg font-semibold line-clamp-2 mt-1 md:text-xl">
                      Does it Also do the Same Thing as Others? We Shall See
                    </h3>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 border-b border-zinc-300 py-3 md:flex-col">
                <img
                  src={headerImg}
                  alt="User profile"
                  className="h-24 md:h-44 lg:h-52 min-w-[35%] md:w-full rounded-2xl object-cover"
                />
                <div className="col-span-2 md:flex md:flex-col md:justify-between md:h-full">
                  <div className="flex items-center w-auto md:order-1">
                    <img
                      src={userImg}
                      alt="User profile"
                      className="h-6 w-6 md:h-12 md:w-12 rounded-full"
                    />
                    <p className="text-zinc-500 text-sm md:text-base">
                      Mark Stern
                    </p>
                  </div>
                  <div className="">
                    <h3 className="text-zinc-800 text-lg font-semibold line-clamp-2 mt-1 md:text-xl">
                      Does it Also do the Same Thing as Others? We Shall See
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;

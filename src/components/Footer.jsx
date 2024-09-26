import React from "react";
import githubImg from "../assets/github-logo.png";

const Footer = () => {
  return (
    <footer className="mt-3">
      <div className="bg-zinc-800 rounded-3xl p-3 mx-6">
        <div>
          <h2 className="text-zinc-200 text-3xl font-semibold mb-2">
            Ready to Get <br /> Our New Stuff?
          </h2>
          <div className="bg-zinc-50 flex rounded-3xl gap-2 p-2 pl-2">
            <input
              type="text"
              name="email"
              placeholder="Your Email"
              className="text-lg w-full rounded-3xl outline-none"
            />
            <button
              type="button"
              className="bg-zinc-800 text-zinc-200 font-semibold rounded-3xl py-1 px-4"
            >
              Send
            </button>
          </div>
        </div>
        <div>
          <div className="mt-10"></div>
          <p className="text-zinc-200 text-lg font-semibold">
            Homespace for Home and Needs
          </p>
          <p className="text-zinc-400 text-base">
            We'll listern to your needs, identify the best approach, and then
            create a bespoke smart EV charging solution that's right for you.
          </p>
        </div>
      </div>
      <div>
        <div className="my-5 mx-6">
          <div className="flex">
            <div className="flex-1">
              <h3 className="text-zinc-800 text-2xl font-semibold mb-4">
                About
              </h3>
              <ul>
                <li className="text-zinc-500 mb-2">Blog</li>
                <li className="text-zinc-500 mb-2">Meet The Team</li>
                <li className="text-zinc-500">Contact Us</li>
              </ul>
            </div>
            <div className="flex-1">
              <h3 className="text-zinc-800 text-2xl font-semibold mb-4">
                Support
              </h3>
              <ul>
                <li className="text-zinc-500 mb-2">Shipping</li>
                <li className="text-zinc-500 mb-2">Return</li>
                <li className="text-zinc-500">FAQ</li>
              </ul>
            </div>
          </div>
          <div></div>
        </div>
        <div className="flex flex-col items-center border-t-2 gap-4 py-3">
          <p className="text-zinc-500">
            Copyright &copy; 2024{" "}
            <a
              href="https://www.github.com/Bongani001"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={githubImg}
                alt="Github logo"
                style={{ width: 20, borderRadius: 5 }}
                className="inline"
              />
              {"   "}
              Bongani Nyaku
            </a>
          </p>
          <div className="flex gap-5">
            <p className="text-zinc-800">Terms of Service</p>
            <p className="text-zinc-800">Privacy Policy</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import githubImg from "../assets/github-logo.png";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-3">
      <div className="bg-zinc-800 rounded-3xl p-3 mx-6 md:flex md:justify-between md:p-5">
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

        <div className="md:max-w-[40%] md:self-end">
          <div className="mt-10 md:mt-0"></div>
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
        <div className="my-5 mx-6 md:flex md:justify-between md:p-6">
          <div className="flex md:gap-24">
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

          <div className="mt-4 md:self-end">
            <p className="text-zinc-800 text-lg">Social Media</p>
            <ul className="flex gap-3 mt-1">
              <li className="bg-zinc-900 rounded-full p-3 hover:bg-zinc-500 transition-all ease-in-out duration-300 hover:scale-110">
                <a href="https://twitter.com/" target="_blank">
                  <FaXTwitter size="20" color="white" />
                </a>
              </li>
              <li className="bg-zinc-900 rounded-full p-3 hover:bg-zinc-500 transition-all ease-in-out duration-300 hover:scale-110">
                <a href="https://www.facebook.com/" target="_blank">
                  <FaFacebookF size="20" color="white" />
                </a>
              </li>
              <li className="bg-zinc-900 rounded-full p-3 hover:bg-zinc-500 transition-all ease-in-out duration-300 hover:scale-110">
                <a href="https://za.linkedin.com/" target="_blank">
                  <FaLinkedinIn size="20" color="white" />
                </a>
              </li>
              <li className="bg-zinc-900 rounded-full p-3 hover:bg-zinc-500 transition-all ease-in-out duration-300 hover:scale-110">
                <a href="https://www.instagram.com/" target="_blank">
                  <FaInstagram size="20" color="white" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between items-center border-t-2 gap-4 py-3 px-5">
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

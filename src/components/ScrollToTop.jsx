import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", () => {
      if (window.scrollY > 150) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  return (
    <>
      <button
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        type="button"
        className={`${
          showButton ? "scale-100" : "scale-0"
        } fixed bottom-7 right-7 bg-zinc-800/50 rounded-full p-2 sm:p-3 transition ease-in-out duration-300 hover:cursor-pointer`}
      >
        <FaArrowUp size={20} color="white" />
      </button>
    </>
  );
};

export default ScrollToTop;

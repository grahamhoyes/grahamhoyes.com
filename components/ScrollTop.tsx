"use client";

import { useEffect, useState } from "react";
import ArrowUpIcon from "@heroicons/react/24/solid/ArrowUpIcon";

import smoothscroll from "smoothscroll-polyfill";

const ScrollTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    smoothscroll.polyfill();
    const handleWindowScroll = () => {
      if (window.scrollY > 50) setShow(true);
      else setShow(false);
    };

    window.addEventListener("scroll", handleWindowScroll);
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`fixed right-8 bottom-8 hidden flex-col gap-3 z-10 ${
        show ? "md:flex" : "md:hidden"
      }`}
    >
      <button
        aria-label="Scroll To Top"
        type="button"
        onClick={handleScrollTop}
        className="rounded-full bg-light-200 p-2 text-light-500 transition-all hover:bg-light-300 dark:bg-dark-700 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 dark:hover:bg-dark-600"
      >
        <ArrowUpIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ScrollTop;

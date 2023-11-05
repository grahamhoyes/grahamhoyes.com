"use client";

import { useState } from "react";
import Link from "./Link";
import headerNavLinks from "@/data/headerNavLinks";

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false);

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = "auto";
      } else {
        // Prevent scrolling
        document.body.style.overflow = "hidden";
      }
      return !status;
    });
  };

  return (
    <div className="sm:hidden">
      <button
        type="button"
        className="ml-1 mr-1 h-8 w-8 rounded py-1"
        aria-label="Toggle Menu"
        onClick={onToggleNav}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="text-light-900 dark:text-dark-100"
        >
          {navShow ? (
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          ) : (
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          )}
        </svg>
      </button>
      <div
        className={`fixed inset-0 top-20 z-10 transform backdrop-blur-md duration-150 ease-in-out ${
          navShow ? "" : "hidden"
        }`}
      >
        <button
          type="button"
          aria-label="toggle modal"
          className="fixed inset-0 h-full w-full cursor-auto focus:outline-none"
          onClick={onToggleNav}
        ></button>
        <nav className="relative overflow-auto rounded-b-lg bg-light-50 py-2 shadow-[0_1rem_0.5rem_0.5rem_white] dark:bg-dark-700 dark:bg-dark-900 dark:shadow-[0_1rem_0.5rem_0.5rem_theme(colors.dark.900)]">
          {headerNavLinks.map((link) => (
            <div
              key={link.title}
              className="colors my-2 ml-2 border-l-4 border-sky-400 transition-colors hover:bg-dark-200 dark:hover:bg-dark-600"
            >
              <Link
                href={link.href}
                className="block px-12 py-2 text-2xl font-semibold tracking-widest text-light-900 dark:text-dark-100"
                onClick={onToggleNav}
              >
                {link.title}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MobileNav;

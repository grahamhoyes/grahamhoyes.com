"use client";

import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
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
    <div className="flex flex-row items-center sm:hidden">
      <button
        type="button"
        className="mx-1 h-8 w-8 rounded"
        aria-label="Toggle Menu"
        onClick={onToggleNav}
      >
        {navShow ? <XMarkIcon /> : <Bars3Icon />}
      </button>

      {navShow && (
        <div
          className={`fixed inset-0 top-[4.5rem] z-10 transform backdrop-blur-md transition-all duration-150 ease-in-out`}
        >
          <button
            type="button"
            aria-label="toggle modal"
            className="fixed inset-0 h-full w-full cursor-auto focus:outline-none"
            onClick={onToggleNav}
          ></button>

          <nav className="fixed h-auto w-full bg-white py-2 shadow-[0_1rem_0.5rem_0.5rem_white] dark:bg-dark-900 dark:shadow-[0_1rem_0.5rem_0.5rem_theme(colors.dark.900)]">
            {headerNavLinks.map((link) => (
              <div
                key={link.title}
                className="my-2 ml-2 border-l-4 border-sky-400 transition-colors hover:bg-dark-200 dark:hover:bg-dark-600"
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
      )}
    </div>
  );
};

export default MobileNav;

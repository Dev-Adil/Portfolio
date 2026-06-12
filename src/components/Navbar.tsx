/**
 * Navigation Bar Component
 * 
 * Provides main site navigation with responsive mobile menu.
 * Includes smooth scrolling, active state management, and accessibility features.
 * 
 * @component
 */

import React, { useEffect, useState } from "react";

import { styles } from "../style";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const observers = navLinks.map((link) => {
      const el = document.getElementById(link.id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(link.title);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <nav
      className={`${styles.paddingX} w-full flex 
      items-center py-5 fixed top-0 z-20 
      bg-primary`}
    >
      <div
        className="w-full flex justify-between 
      items-center max-w-7xl mx-auto"
      >
        <a
          href="#"
          className="flex items-center gap-2"
          onClick={(e) => {
            e.preventDefault();
            setActive("");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img src={logo} alt="logo" loading="eager" decoding="async" width="36" height="36" className="w-9 h-9 object-contain" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex">
            Adil Ahmad
            {/*&nbsp;
            <span className="sm:block hidden">| CEO of Quantonimus</span>*/}
          </p>
        </a>
        <ul className="list-none hidden sm:flex flex-row gap-10" role="navigation" aria-label="Main navigation">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`${
                  active === link.title ? "text-[#915eff] after:scale-x-100" : "text-white"
                } relative hover:text-[#915eff] text-[18px] font-medium cursor-pointer transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#915eff] after:transition-transform after:duration-300 hover:after:scale-x-100 focus:outline-none focus:ring-2 focus:ring-[#915eff] focus:ring-offset-2 focus:ring-offset-primary rounded`}
                onClick={() => {
                  setActive(link.title);
                }}
                aria-current={active === link.title ? "page" : undefined}
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <button
            type="button"
            aria-label={toggle ? "Close menu" : "Open menu"}
            aria-expanded={toggle}
            className="w-[28px] h-[28px] flex items-center justify-center"
            onClick={() => setToggle(!toggle)}
          >
            <img
              src={toggle ? close : menu}
              alt=""
              className="w-full h-full object-contain"
              aria-hidden="true"
            />
          </button>

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-gradient-to-br from-tertiary via-black-100 to-primary absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl border border-indigo-500/20 backdrop-blur-sm`}
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <ul className="list-none flex flex justify-end items-start flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.id} role="none">
                  <a
                    href={`#${link.id}`}
                    className={`${
                      active === link.title ? "text-white" : "text-secondary"
                    } font-poppins font-medium cursor-pointer text-[16px] transition-colors focus:outline-none focus:ring-2 focus:ring-[#915eff] focus:ring-offset-2 focus:ring-offset-tertiary rounded`}
                    onClick={() => {
                      setToggle(false);
                      setActive(link.title);
                    }}
                    role="menuitem"
                    aria-current={active === link.title ? "page" : undefined}
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

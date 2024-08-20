import React, { useContext, useState, useEffect, useRef } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { MdClose, MdMenu } from "react-icons/md";
import { NavLink } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import './Navbar.css'; // Ensure this file contains the CSS for glass effect and animations
import { ThemeContext } from "../Theme/ThemeContext";
import { FaCartPlus } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const themeContext = useContext(ThemeContext); // Use ThemeContext

  if (!themeContext) {
    throw new Error('ThemeContext must be used within a ThemeProvider');
  }

  const { theme, toggleTheme } = themeContext;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const showAnim = gsap.fromTo(
      ".navbar",
      { y: 0 },
      {
        y: -100,
        duration: 0.3,
        paused: true
      }
    );

    const scrollTriggerInstance = ScrollTrigger.create({
      start: "top top",
      end: 99999,
      onUpdate: (self) => {
        if (self.direction === -1) {
          showAnim.reverse();
        } else {
          showAnim.play();
        }
      },
    });

    return () => {
      scrollTriggerInstance.kill();
    };
  }, []);
  useEffect(() => {
    if (isOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    } else if (menuRef.current) {
      gsap.to(menuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power4.in",
      });
    }
  }, [isOpen]);

  // Cart and user icons
  const cartUserIcons = (
    <div className="flex items-center gap-1 md:gap-2 relative">
      <NavLink to="/">
        
      </NavLink>
      <NavLink to="addCart">
        <div className="relative">
          <FaCartPlus size={24} />
          <div className="absolute top-0 right-0 bg-red-400 text-white text-xs h-4 w-4 rounded-full  items-center justify-center hidden">
            {/* Badge number can be dynamically set */}
          </div>
        </div>
      </NavLink>
    </div>
  );

  const navOptions = (
    <>
      <NavLink to="/" onClick={() => setIsOpen(false)} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
        <li className="px-2 py-2 text-md md:text-sm rounded-md md:px-0 md:py-0 md:mt-0 md:rounded-none border  md:border-none ">Home</li>
      </NavLink>
      <NavLink to="/product" onClick={() => setIsOpen(false)} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
        <li className="px-2 py-2 text-md md:text-sm rounded-md md:px-0 md:py-0 md:mt-0 md:rounded-none border  md:border-none">Products</li>
      </NavLink>
      <NavLink to="/contact" onClick={() => setIsOpen(false)} className="nav-link">
        <li className="px-2 py-2 text-md md:text-sm mt-2 rounded-md md:px-0 md:py-0 md:mt-0 md:rounded-none border  md:border-none">Contact Us</li>
      </NavLink>

      <NavLink to="/about" onClick={() => setIsOpen(false)} className="nav-link">
        <li className="px-2 py-2 text-md md:text-sm mt-2 rounded-md md:px-0 md:py-0 md:mt-0 md:rounded-none border  md:border-none">About us</li>
      </NavLink>
      <NavLink to="/dashboard" onClick={() => setIsOpen(false)} className="nav-link">
        <li className="px-2 py-2 text-md md:text-sm mt-2 rounded-md md:px-0 md:py-0 md:mt-0 md:rounded-none border  md:border-none">Dashboard</li>
      </NavLink>
    </>
  );

  return (
    <div className={`max-w-[1300px] mx-auto navbar fixed top-0 w-full z-10 transition-transform duration-200 bg-transparent hover:backdrop-blur-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <div className={`py-[25px] lg:py-[26px] md:py-5  relative px-4 backdrop-blur-md  ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
        <div className="flex justify-between items-center">
          <div className="font-bold text-sm md:text-md">
            <p className="font-serif ">Backwoods Basecamp
            </p>
          </div>
          <div className="md:hidden flex items-center gap-2">
            {cartUserIcons}
            <button onClick={toggleMenu} className="menu-btn focus:outline-none">
              {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
            </button>
            <button onClick={toggleTheme} className="focus:outline-none ml-2">
              {theme === 'light' ? <FaMoon size={24} /> : <FaSun size={24} />}
            </button>
          </div>
          <ul className="hidden md:flex md:gap-2 list-none md:space-x-2 font-bold">
            {navOptions}
            <button onClick={toggleTheme} className="focus:outline-none ml-2 sm:block md:hidden">
              {theme === 'light' ? <FaMoon size={24} /> : <FaSun size={24} />}
            </button>
          </ul>
          <div className="hidden md:flex">
            {cartUserIcons}
          </div>
        </div>
        {isOpen && (
          <div className={`md:hidden absolute top-full left-0 right-0 z-10 transform transition-transform duration-300 backdrop-blur-md bg-white/30 border rounded-lg ${theme === 'dark' ? 'text-white' : 'text-black'} animate-slide-in`}>
            <ul className="flex flex-col gap-2 list-none font-bold py-2 px-4">
              {navOptions}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

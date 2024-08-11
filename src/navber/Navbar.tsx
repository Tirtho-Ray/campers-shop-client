import React, { useContext, useState, useEffect } from "react";
import { FaMoon, FaRegUserCircle, FaSun, FaUser } from "react-icons/fa";
import { MdClose, MdMenu } from "react-icons/md";
import { NavLink } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import './Navbar.css';
import { ThemeContext } from "../Theme/ThemeContext";
import { FaCartPlus } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
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

//   cart and user icons
  const cartUserIcons = (
    <div className="flex items-center gap-1 md:gap-2 relative">
      <NavLink to="/">
        <FaUser size={24} />
      </NavLink>
      <NavLink to="addCart">
        <div>
          <FaCartPlus size={24} />
          <div className="absolute top-[2px] left-10 md:left-[42px] md:top-[3px] lg:left-[42px] lg:top-[2px] xl:left-[42px]">
            <button className="h-4 w-4 rounded-full bg-red-400 text-[10px]"></button>
          </div>
        </div>
      </NavLink>
    </div>
  );

  const navOptions = (
    <>
      <NavLink to="/" onClick={() => setIsOpen(false)} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
        <li className="px-2 py-2 text-md md:text-sm rounded-md md:px-0 md:py-0 md:mt-0 md:rounded-none">Home</li>
      </NavLink>
      <NavLink to="/product" onClick={() => setIsOpen(false)} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
        <li className="px-2 py-2 text-md md:text-sm rounded-md md:px-0 md:py-0 md:mt-0 md:rounded-none">Products</li>
      </NavLink>
      <NavLink to="/about" onClick={() => setIsOpen(false)} className="nav-link">
        <li className="px-2 py-2 text-md md:text-sm mt-2 rounded-md md:px-0 md:py-0 md:mt-0 md:rounded-none">Contact Us</li>
      </NavLink>
      <NavLink to="/dashboard" onClick={() => setIsOpen(false)} className="nav-link">
        <li className="px-2 py-2 text-md md:text-sm mt-2 rounded-md md:px-0 md:py-0 md:mt-0 md:rounded-none">Dashboard</li>
      </NavLink>
      <NavLink to="/shop" onClick={() => setIsOpen(false)} className="nav-link">
        <li className="px-2 py-2 text-md md:text-sm mt-2 rounded-md md:px-0 md:py-0 md:mt-0 md:rounded-none">Our Shop</li>
      </NavLink>
    </>
  );

  return (
    <div className={`navbar fixed top-0 w-full z-10 transition-transform duration-200 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <div className="py-3 md:py-4 lg:py-6 relative px-4 bg-red-400">
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl">
            <p>Campers</p>
          </div>
          <div className="md:hidden flex items-center gap-2">
            {cartUserIcons}
            <button onClick={toggleMenu} className="focus:outline-none">
              {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
            </button>
            <button onClick={toggleTheme} className="focus:outline-none ml-2">
              {theme === 'light' ? <FaMoon size={24} /> : <FaSun size={24} />}
            </button>
          </div>
          <ul className="hidden md:flex md:gap-2 list-none md:space-x-2 font-bold">
            {navOptions}
            <button onClick={toggleTheme} className="focus:outline-none ml-2">
              {theme === 'light' ? <FaMoon size={24} /> : <FaSun size={24} />}
            </button>
          </ul>
          <div className="hidden md:flex">
            {cartUserIcons}
          </div>
        </div>
        {isOpen && (
          <div className={`md:hidden absolute top-full left-0 right-0 z-10 shadow-md transform transition-transform duration-300 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <ul className="flex flex-col gap-2 list-none font-bold py-2 px-4 h-full">
              {navOptions}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

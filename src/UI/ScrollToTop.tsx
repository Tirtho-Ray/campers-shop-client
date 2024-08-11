import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

interface ScrollManagerProps {
  children: React.ReactNode;
}

const ScrollManager: React.FC<ScrollManagerProps> = ({ children }) => {
  const { pathname } = useLocation();
  const scrollPositions = useRef<{ [key: string]: number }>({});

  useEffect(() => {
    // Save the current scroll position before navigating away
    const handleScroll = () => {
      scrollPositions.current[pathname] = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    // Restore the scroll position if it exists, otherwise scroll to top
    const scrollY = scrollPositions.current[pathname] ?? 0;
    window.scrollTo({ top: scrollY, behavior: "smooth" });
  }, [pathname]);

  return <>{children}</>;
};

export default ScrollManager;

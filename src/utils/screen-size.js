import { useEffect, useState } from "react";

export const ScreenSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return windowSize;
};

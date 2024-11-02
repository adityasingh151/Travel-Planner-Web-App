import { useState, useEffect } from "react";

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowDimensions({ width: window.innerWidth });
    }

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call handleResize immediately to set initial width
    handleResize();

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

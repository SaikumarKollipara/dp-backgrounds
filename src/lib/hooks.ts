import { useState, useEffect } from "react";

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const { width, height } = windowSize;

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    width,
    height,

    isSmWidth: width >= 640,
    isMdWidth: width >= 768,
    isLgWidth: width >= 1024,
    isXlWidth: width >= 1280,
    is2xlWidth: width >= 1536,

    isFixedSmWidth: width >= 640 && width < 768,
    isFixedMdWidth: width >= 768 && width < 1024,
    isFixedLgWidth: width >= 1024 && width < 1280,
    isFixedXlWidth: width >= 1280 && width < 1536,
    isFixed2xlWidth: width >= 1536,
  };
}

export default useWindowSize;

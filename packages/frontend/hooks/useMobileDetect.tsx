import { useEffect, useState } from "react";

const useMobileDetect = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    // Check on mount and on resize
    window.addEventListener("resize", checkMobile);
    checkMobile();

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return isMobile;
};

export default useMobileDetect;

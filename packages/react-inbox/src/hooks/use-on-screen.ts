import { useEffect, useState } from "react";

export const useOnScreen = (ref, options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        rootMargin: "0px",
        ...options,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (!ref.current) {
        return;
      }

      observer.unobserve(ref.current);
    };
  }, []);
  return isIntersecting;
};

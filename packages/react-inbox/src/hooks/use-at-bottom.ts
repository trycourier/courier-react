import {
  useCallback, useEffect, useState,
} from "react";

export function useAtBottom(element) {
  const [atBottom, setAtBottom] = useState(false);
  const reset = useCallback(() => setAtBottom(false), []);
  const containerElement = element;
  const handleScroll = useCallback(() => {
    if (containerElement?.scrollTop + containerElement?.clientHeight + 50 >= containerElement?.scrollHeight) {
      setAtBottom(true);
    }
  }, [containerElement?.clientHeight, containerElement?.scrollHeight, containerElement?.scrollTop]);


  useEffect(() => {
    containerElement?.addEventListener("scroll", handleScroll);
    return () => containerElement?.removeEventListener("scroll", handleScroll);
  }, [containerElement, handleScroll]);
  return {
    atBottom,
    reset,
  };
}
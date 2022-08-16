import { useCallback, useEffect, useState } from "react";

export function useAtBottom(ref, cb, deps) {
  const [atBottom, setAtBottom] = useState(false);
  const reset = useCallback(() => setAtBottom(false), []);
  const containerElement = ref?.current;

  const handleScroll = useCallback(() => {
    if (!containerElement?.scrollTop || containerElement.scrollTop < 100) {
      return;
    }

    if (
      containerElement?.scrollTop + containerElement?.clientHeight + 50 >=
      containerElement?.scrollHeight
    ) {
      cb();
    }
  }, [
    ...deps,
    containerElement?.clientHeight,
    containerElement?.scrollHeight,
    containerElement?.scrollTop,
  ]);

  useEffect(() => {
    containerElement?.addEventListener("scroll", handleScroll);
    return () => containerElement?.removeEventListener("scroll", handleScroll);
  }, [containerElement, handleScroll]);

  return {
    atBottom,
    reset,
  };
}

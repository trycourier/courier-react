import { useCallback, useEffect } from "react";

export function useOnScroll(ref, options, deps) {
  const containerElement = ref?.current;

  const handleScroll = useCallback(() => {
    options?.onScroll(containerElement);

    if (!containerElement?.scrollTop || containerElement.scrollTop < 100) {
      return;
    }

    if (
      containerElement?.scrollTop + containerElement?.clientHeight + 50 >=
      containerElement?.scrollHeight
    ) {
      options?.atBottom();
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
    scrollTop: containerElement?.scrollTop,
  };
}

import { useEffect, useRef, useState } from "react";

function useHover(cb?: (event: Event) => boolean | void) {
  const [value, setValue] = useState(false);
  const ref: React.RefObject<HTMLDivElement> = useRef(null);
  const handleMouseOver = (event: Event) => {
    let shouldHover = true;
    if (cb) {
      shouldHover = cb(event) !== false;
    }
    setValue(shouldHover);
  };
  const handleMouseOut = () => setValue(false);
  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener("focus", handleMouseOver);
        node.addEventListener("mouseenter", handleMouseOver);
        node.addEventListener("mouseleave", handleMouseOut);
        return () => {
          node.removeEventListener("mouseenter", handleMouseOver);
          node.removeEventListener("mouseleave", handleMouseOut);
        };
      }
    },
    [ref.current] // Recall only if ref changes
  );
  const returnVal: [React.RefObject<HTMLDivElement>, boolean] = [ref, value];
  return returnVal;
}

export default useHover;

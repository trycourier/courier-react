import { useEffect, useRef, useState } from "react";

function useHover() {
  const [value, setValue] = useState(false);
  const ref: React.RefObject<HTMLDivElement> = useRef(null);
  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);
  useEffect(
    () => {
      const node = ref.current;
      if (node) {
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

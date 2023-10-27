import { useEffect, useState } from "react";

function useHover(
  ref: React.RefObject<HTMLDivElement>,
  cb?: (event: Event) => boolean | void
) {
  const [value, setValue] = useState(false);
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
      const node = ref?.current;

      if (node) {
        node.addEventListener("mouseenter", handleMouseOver);
        node.addEventListener("mouseleave", handleMouseOut);
        return () => {
          node.removeEventListener("mouseenter", handleMouseOver);
          node.removeEventListener("mouseleave", handleMouseOut);
        };
      }
    },
    [ref?.current] // Recall only if ref changes
  );

  return value;
}

export default useHover;

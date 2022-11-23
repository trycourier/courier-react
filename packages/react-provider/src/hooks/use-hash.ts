import { useMemo } from "react";

function hash(text) {
  let hash = 5381;
  let index = text.length;

  while (index) {
    hash = (hash * 33) ^ text.charCodeAt(--index);
  }

  return hash >>> 0;
}

const useHash = (input: string) => {
  return useMemo(() => {
    return hash(input).toString(16);
  }, [input]);
};

export default useHash;

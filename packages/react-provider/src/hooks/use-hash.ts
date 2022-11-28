import { useMemo } from "react";

/**
    A string hashing function based on Daniel J. Bernstein's popular 'times 33' hash algorithm.
*/

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

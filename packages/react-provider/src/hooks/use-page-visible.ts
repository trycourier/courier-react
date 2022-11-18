import { useEffect } from "react";

export function getIsDocumentHidden() {
  return !document.hidden;
}

export function usePageVisible(callback: (isVisible: boolean) => void) {
  const onVisibilityChange = () => {
    callback(getIsDocumentHidden());
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", onVisibilityChange, false);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  });
}

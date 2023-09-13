import { useEffect } from "react";

export function getIsDocumentHidden() {
  return typeof document !== "undefined" && !document.hidden;
}

export function usePageVisible(callback: (isVisible: boolean) => void) {
  const onVisibilityChange = () => {
    callback(getIsDocumentHidden());
  };

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }
    document.addEventListener("visibilitychange", onVisibilityChange, false);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  });
}

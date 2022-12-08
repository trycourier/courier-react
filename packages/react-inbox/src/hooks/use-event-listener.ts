import { useRef, useEffect } from "react";

const useEventListener = (eventName, handler, element?: Element | Window) => {
  element = element ?? typeof window !== "undefined" ? window : undefined;
  const savedHandler = useRef<React.EventHandler<any>>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      if (!element) {
        return;
      }
      // Make sure element supports addEventListener
      // On
      const isSupported = Boolean(element?.addEventListener);
      if (!isSupported || !savedHandler) {
        return;
      }
      // Create event listener that calls handler function stored in ref
      const eventListener = (event) => {
        if (!savedHandler?.current) {
          return;
        }

        return savedHandler.current(event);
      };

      // Add event listener
      element.addEventListener(eventName, eventListener);
      // Remove event listener on cleanup
      return () => {
        if (!element) {
          return;
        }

        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
};

export default useEventListener;

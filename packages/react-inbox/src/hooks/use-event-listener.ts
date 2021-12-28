import { useRef, useEffect } from "react";

const useEventListener = (eventName, handler, element = window) => {
  const savedHandler = useRef<React.EventHandler<any>>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      // Make sure element supports addEventListener
      // On
      const isSupported = element && element.addEventListener;
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
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
};

export default useEventListener;

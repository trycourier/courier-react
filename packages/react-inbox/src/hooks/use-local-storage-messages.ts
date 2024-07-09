import { useEffect, useMemo } from "react";
import { useInbox } from "@trycourier/react-hooks";
import { useCourier } from "@trycourier/react-provider";

const useLocalStorageMessages = ({
  clientKey,
  userId,
}: {
  clientKey?: string;
  userId?: string;
}) => {
  const { localStorage } = useCourier();
  const { messages, pinned, startCursor, unreadMessageCount } = useInbox();

  useEffect(() => {
    if (!localStorage) {
      return;
    }

    // remove old 1.X LS Key
    localStorage.removeItem(`${clientKey}/${userId}/messages`);
  }, [clientKey, userId, localStorage]);

  const localStorageKey = useMemo(() => {
    if (!clientKey || !userId) {
      return;
    }

    return `${clientKey}/${userId}/inbox`;
  }, [clientKey, userId]);

  const localStorageState = useMemo(() => {
    if (!localStorageKey || !localStorage) {
      return;
    }

    try {
      const item = localStorage.getItem(localStorageKey);
      return item ? JSON.parse(item) : {};
    } catch {
      // do nothing
    }
  }, [localStorageKey, localStorage]);

  useEffect(() => {
    if (!localStorageKey || !localStorage) {
      return;
    }

    localStorage.setItem(
      localStorageKey,
      JSON.stringify({
        messages,
        pinned,
        startCursor,
        unreadMessageCount,
      })
    );
  }, [
    localStorage,
    localStorageKey,
    messages,
    pinned,
    startCursor,
    unreadMessageCount,
  ]);

  return localStorageState;
};

export default useLocalStorageMessages;

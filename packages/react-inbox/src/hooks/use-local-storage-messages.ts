import { useEffect, useMemo } from "react";
import { useInbox } from "@trycourier/react-hooks";
import { useCourier } from "@trycourier/react-provider";

const useLocalStorageMessages = (clientKey: string, userId: string) => {
  const { localStorage } = useCourier();
  const { lastMessagesFetched, messages, startCursor, unreadMessageCount } =
    useInbox();

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
      return JSON.parse(localStorage.getItem(localStorageKey));
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
        lastMessagesFetched,
        messages,
        startCursor,
        unreadMessageCount,
      })
    );
  }, [
    localStorageKey,
    localStorage,
    messages,
    startCursor,
    unreadMessageCount,
  ]);

  return localStorageState;
};

export default useLocalStorageMessages;

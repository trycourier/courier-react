import { useEffect, useMemo } from "react";
import { useInbox } from "@trycourier/react-hooks";
import { useCourier } from "@trycourier/react-provider";

const useLocalStorageMessages = (clientKey: string, userId: string) => {
  const { localStorage } = useCourier();
  const {
    lastMessagesFetched,
    messages,
    rehydrateMessages,
    startCursor,
    unreadMessageCount,
  } = useInbox();

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

  useEffect(() => {
    if (!localStorageKey || !localStorage) {
      return;
    }

    const localStorageState = localStorage.getItem(localStorageKey);
    if (localStorageState) {
      try {
        const {
          lastMessagesFetched,
          unreadMessageCount,
          messages,
          startCursor,
        } = JSON.parse(localStorageState);
        rehydrateMessages({
          lastMessagesFetched,
          messages,
          startCursor,
          unreadMessageCount,
        });
      } catch (ex) {
        console.log("error", ex);
      }
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
};

export default useLocalStorageMessages;

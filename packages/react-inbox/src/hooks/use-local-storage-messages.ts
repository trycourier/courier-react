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
    tabs,
    unreadMessageCount,
  } = useInbox();

  const localStorageKey = useMemo(() => {
    if (!clientKey || !userId) {
      return;
    }

    return `${clientKey}/${userId}/messages`;
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
          tabs,
          startCursor,
        } = JSON.parse(localStorageState);
        rehydrateMessages({
          lastMessagesFetched,
          messages,
          startCursor,
          tabs,
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
        tabs: tabs?.map((tab) => {
          if (!tab.state) {
            return tab;
          }

          const tabState = tab.state;
          return {
            ...tab,
            state: {
              messages: tabState?.messages,
              startCursor: tabState.startCursor,
            },
          };
        }),
      })
    );
  }, [
    localStorageKey,
    localStorage,
    messages,
    startCursor,
    tabs,
    unreadMessageCount,
  ]);
};

export default useLocalStorageMessages;

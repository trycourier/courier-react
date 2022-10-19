import { useEffect, useMemo } from "react";
import { useInbox } from "@trycourier/react-hooks";

const useLocalStorageMessages = (clientKey: string, userId: string) => {
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
    if (!localStorageKey) {
      return;
    }

    const localStorageState = window.localStorage.getItem(localStorageKey);
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
  }, [localStorageKey]);

  useEffect(() => {
    if (!localStorageKey) {
      return;
    }

    window.localStorage.setItem(
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
  }, [localStorageKey, messages, startCursor, tabs, unreadMessageCount]);
};

export default useLocalStorageMessages;

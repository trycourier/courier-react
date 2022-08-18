import { useEffect, useMemo } from "react";
import { useInbox } from "@trycourier/react-hooks";

const useLocalStorageMessages = (clientKey: string, userId: string) => {
  const { messages, rehydrateMessages, startCursor, tabs, unreadMessageCount } =
    useInbox();

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
        const { unreadMessageCount, messages, tabs, startCursor } =
          JSON.parse(localStorageState);
        rehydrateMessages({
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

    const hasMoreThan10Messages = (messages?.length ?? 0) > 10;

    window.localStorage.setItem(
      localStorageKey,
      JSON.stringify({
        messages: messages?.slice(0, 10),
        startCursor: hasMoreThan10Messages ? undefined : startCursor,
        unreadMessageCount,
        tabs: tabs?.map((tab) => {
          if (!tab.state) {
            return tab;
          }

          // only save first 10 messages in state
          const tabState = tab.state;
          const tabHasMoreThan10 = (tabState?.messages?.length ?? 0) > 10;

          return {
            ...tab,
            state: {
              messages: tabState?.messages?.slice(0, 10),
              startCursor: tabHasMoreThan10 ? undefined : tabState.startCursor,
            },
          };
        }),
      })
    );
  }, [localStorageKey, messages, startCursor, tabs, unreadMessageCount]);
};

export default useLocalStorageMessages;

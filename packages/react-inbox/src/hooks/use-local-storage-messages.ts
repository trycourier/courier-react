import { useEffect, useMemo } from "react";
import { useInbox } from "@trycourier/react-hooks";

const useLocalStorageMessages = (clientKey: string, userId: string) => {
  const { messages, startCursor, tabs, rehydrateMessages } = useInbox();

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
        const { messages, tabs, startCursor } = JSON.parse(localStorageState);
        rehydrateMessages({
          messages,
          startCursor,
          tabs,
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
        messages,
        startCursor,
        tabs: tabs?.map((tab) => {
          if (!tab.state) {
            return tab;
          }

          // only save first 10 messages in state
          const tabState = tab.state;
          const hasMoreThan10 = (tabState?.messages?.length ?? 0) > 10;

          return {
            ...tab,
            state: {
              messages: tabState?.messages?.slice(0, 10),
              startCursor: hasMoreThan10 ? undefined : tabState.startCursor,
            },
          };
        }),
      })
    );
  }, [localStorageKey, startCursor, messages, tabs]);
};

export default useLocalStorageMessages;

import { useCourier } from "@trycourier/react-provider";
import { useCallback, useEffect } from "react";
import { TippyProps } from "@tippyjs/react";
import useInbox from "~/hooks/use-inbox";

export const getTippyProps = ({ trigger, placement }): TippyProps => ({
  trigger: trigger ?? "click",
  placement: placement ?? "right",
  interactive: true,
});

export function useSaveState({ messages, unreadMessageCount, title, tabs }) {
  const courierContext = useCourier();
  useEffect(() => {
    const { clientKey, userId } = courierContext;
    if (clientKey && userId) {
      localStorage.setItem(
        `${clientKey}/${userId}/inbox`,
        JSON.stringify({
          messages: messages,
          unreadMessageCount: unreadMessageCount,
          config: {
            tabs,
            title,
          },
        })
      );
    }
  }, [messages, unreadMessageCount, courierContext]);
}

export const handleBellOnMouseEnter = useCallback((event: React.MouseEvent) => {
  const { currentTab, fetchMessages } = useInbox();
  event.preventDefault();
  fetchMessages(currentTab?.filter);
}, []);

import { useCourier } from "@trycourier/react-provider";
import { useEffect } from "react";

import deepExtend from "deep-extend";

import useInboxActions from "./use-inbox-actions";
import { IInbox } from "./types";

const useInbox = () => {
  const { dispatch, inbox, transport, brand } =
    useCourier<{
      inbox: IInbox;
    }>();

  const actions = useInboxActions();

  if (inbox && (brand || inbox.brand)) {
    inbox.brand = deepExtend({}, brand ?? {}, inbox.brand ?? {});
  }

  useEffect(() => {
    transport?.listen({
      id: "message-listener",
      type: "message",
      listener: (courierEvent) => {
        if (!dispatch || !courierEvent?.data) {
          return;
        }

        actions.newMessage(courierEvent?.data);
      },
    });

    transport?.listen({
      id: "event-listener",
      type: "event",
      listener: (courierEvent) => {
        const data = courierEvent?.data;
        if (!dispatch || !data || !data?.event || !data?.messageId) {
          return;
        }

        switch (data.event) {
          case "read": {
            actions.markMessageRead(data.messageId);
            return;
          }

          case "unread": {
            /* 
              intentionally do not patch unread as if the unread message that is referenced is not in state,
              then we will be screwing with the local state.  instead just reset last fetched so we fetch new data 
              the next time the inbox is open and closed
            */
            actions.resetLastFetched();
            return;
          }

          case "archive": {
            actions.markMessageArchived(data.messageId);
            return;
          }
        }
      },
    });
  }, [transport]);

  return { ...inbox, ...actions };
};

export default useInbox;

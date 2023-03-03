import {
  ICourierEventMessage,
  IInboxMessagePreview,
  useCourier,
} from "@trycourier/react-provider";
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

        actions.newMessage(courierEvent?.data as IInboxMessagePreview);
      },
    });

    transport?.listen({
      id: "event-listener",
      type: "event",
      listener: (courierEvent) => {
        const data = courierEvent?.data as ICourierEventMessage;
        if (!dispatch || !data || !data?.event) {
          return;
        }

        if (data.event === "mark-all-read") {
          actions.markAllAsRead(true);
        }

        if (!data?.messageId) {
          return;
        }

        switch (data.event) {
          case "read": {
            actions.markMessageRead(data.messageId, true);
            return;
          }

          case "opened": {
            actions.markMessageOpened(data.messageId, true);
            return;
          }

          case "unread": {
            actions.markMessageUnread(data.messageId, true);
            return;
          }

          case "archive": {
            actions.markMessageArchived(data.messageId, true);
            return;
          }
        }
      },
    });
  }, [transport]);

  return { ...inbox, ...actions };
};

export default useInbox;

import {
  useCourier,
  registerReducer,
  IInboxMessagePreview,
  ICourierEventMessage,
} from "@trycourier/react-provider";
import { useEffect } from "react";
import reducer from "./reducer";
import deepExtend from "deep-extend";
import useElementalInboxActions from "./use-inbox-actions";
import { IElementalInbox } from "./types";

export const useElementalInbox = () => {
  const { dispatch, inbox, transport, brand } =
    useCourier<{
      inbox: IElementalInbox;
    }>();

  const actions = useElementalInboxActions();

  if (inbox) {
    inbox.brand = deepExtend({}, brand ?? {}, inbox.brand ?? {});
  }

  useEffect(() => {
    registerReducer("inbox", reducer);
  }, []);

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

          case "unread": {
            actions.markMessageUnread(data.messageId, true);
            return;
          }

          case "archive": {
            actions.markMessageArchived(data.messageId, true);
            return;
          }

          case "mark-all-read": {
            actions.markAllAsRead(true);
            return;
          }
        }
      },
    });
  }, [transport]);

  return { ...inbox, ...actions };
};

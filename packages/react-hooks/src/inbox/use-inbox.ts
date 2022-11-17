import { useCourier, registerReducer } from "@trycourier/react-provider";
import { useEffect } from "react";
import reducer from "./reducer";

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
            actions.markMessageUnread(data.messageId);
            return;
          }

          case "archive": {
            actions.markMessageArchived(data.messageId);
            return;
          }
        }

        console.log("courierEvent", courierEvent);
      },
    });
  }, [transport]);

  return { ...inbox, ...actions };
};

export default useInbox;

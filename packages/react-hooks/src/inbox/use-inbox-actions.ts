import { useCourier } from "@trycourier/react-provider";
import { ITab } from "./types";

import {
  createCourierClient,
  Events,
  Messages,
} from "@trycourier/client-graphql";

import {
  IGetMessagesParams,
  IMessageCountParams,
} from "@trycourier/client-graphql/typings/messages";

export interface IFetchMessagesParams {
  params?: IGetMessagesParams;
  after?: string;
}

const useInboxActions = () => {
  const {
    apiUrl,
    dispatch,
    inbox,
    clientKey,
    userId,
    userSignature,
  } = useCourier();

  const courierClient = createCourierClient({
    apiUrl,
    clientKey,
    userId,
    userSignature,
  });

  const events = Events({ client: courierClient });
  const messages = Messages({ client: courierClient });

  return {
    init: (payload) => {
      dispatch({
        type: "inbox/INIT",
        payload,
      });

      if (payload.isOpen) {
        const meta = {
          from: inbox?.from,
        };

        dispatch({
          type: "inbox/FETCH_MESSAGES",
          meta,
          payload: () => messages.getMessages(meta),
        });
      }
    },

    toggleInbox: (isOpen?: boolean) => {
      dispatch({
        type: "inbox/TOGGLE_INBOX",
        payload: isOpen,
      });
    },

    setView: (view: "messages" | "preferences") => {
      dispatch({
        type: "inbox/SET_VIEW",
        payload: view,
      });
    },

    setCurrentTab: (newTab: ITab) => {
      dispatch({
        type: "inbox/SET_CURRENT_TAB",
        payload: newTab,
      });

      const meta = {
        from: inbox?.from,
        ...newTab?.filters,
      };

      dispatch({
        type: "inbox/FETCH_MESSAGES",
        meta,
        payload: () => messages.getMessages(meta),
      });
    },

    fetchMessages: (payload?: IFetchMessagesParams) => {
      const params = {
        from: inbox?.from,
        ...payload?.params,
      };
      dispatch({
        type: "inbox/FETCH_MESSAGES",
        payload: () => messages.getMessages(params, payload?.after),
        meta: payload,
      });
    },

    getMessageCount: (params?: IMessageCountParams) => {
      dispatch({
        type: "inbox/SET_UNREAD_MESSAGE_COUNT",
        payload: () => messages.getMessageCount(params),
      });
    },

    markMessageRead: async (messageId: string, trackingId: string) => {
      dispatch({
        type: "inbox/MARK_MESSAGE_READ",
        payload: {
          messageId,
        },
      });
      await events.trackEvent(trackingId);
    },

    markMessageUnread: async (messageId: string, trackingId: string) => {
      dispatch({
        type: "inbox/MARK_MESSAGE_UNREAD",
        payload: {
          messageId,
        },
      });
      await events.trackEvent(trackingId);
    },
    markAllAsRead: async () => {
      dispatch({
        type: "inbox/MARK_ALL_AS_READ",
      });
      await events.trackEventBatch("read");
    },
  };
};

export default useInboxActions;

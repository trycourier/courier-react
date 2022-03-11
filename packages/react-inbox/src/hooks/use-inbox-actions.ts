import { useCourier } from "@trycourier/react-provider";
import { ITab } from "~/types";

import {
  createCourierClient,
  getMessages,
  getUnreadMessageCount,
  trackEvent,
  trackEventBatch,
} from "@trycourier/client-graphql";

import {
  IGetMessagesParams,
  IMessageCountParams,
} from "@trycourier/client-graphql/typings/messages";

const useInboxActions = () => {
  const {
    apiUrl,
    dispatch,
    inbox,
    clientKey,
    userId,
    userSignature,
  } = useCourier();

  const graphQLClient = createCourierClient({
    apiUrl,
    clientKey,
    userId,
    userSignature,
  });

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
          payload: () => getMessages(graphQLClient)(meta),
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
        payload: () => getMessages(graphQLClient)(meta),
      });
    },

    fetchMessages: (params?: IGetMessagesParams) => {
      const meta = {
        from: inbox?.from,
        ...params,
      };
      dispatch({
        type: "inbox/FETCH_MESSAGES",
        payload: () => getMessages(graphQLClient)(meta),
        meta,
      });
    },

    getUnreadMessageCount: (params?: IMessageCountParams) => {
      dispatch({
        type: "inbox/SET_UNREAD_MESSAGE_COUNT",
        payload: () => getUnreadMessageCount(graphQLClient)(params),
      });
    },

    markMessageRead: async (messageId: string, trackingId: string) => {
      dispatch({
        type: "inbox/MARK_MESSAGE_READ",
        payload: {
          messageId,
        },
      });
      await trackEvent(graphQLClient)(trackingId);
    },

    markMessageUnread: async (messageId: string, trackingId: string) => {
      dispatch({
        type: "inbox/MARK_MESSAGE_UNREAD",
        payload: {
          messageId,
        },
      });
      await trackEvent(graphQLClient)(trackingId);
    },
    markAllAsRead: async () => {
      dispatch({
        type: "inbox/MARK_ALL_AS_READ",
      });
      await trackEventBatch(graphQLClient)("read");
    },
  };
};

export default useInboxActions;

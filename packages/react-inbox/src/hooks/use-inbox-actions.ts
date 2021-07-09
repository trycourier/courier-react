import { useCourier } from "@trycourier/react-provider";
import {
  getUnreadMessageCount,
  IMessageCountParams,
} from "~/actions/message-count";
import { getMessages, IGetMessagesParams } from "~/actions/messages";
import { DEFAULT_TABS } from "~/constants";
import { ITab } from "~/types";

const useInboxActions = () => {
  const {
    dispatch,
    createTrackEvent,
    createBatchTrackEvent,
    graphQLClient,
  } = useCourier();

  return {
    init: (payload) => {
      payload = {
        ...payload,
        tabs: payload.tabs ?? DEFAULT_TABS,
      };

      dispatch({
        type: "inbox/INIT",
        payload,
      });
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

      console.log("graphQLClient", graphQLClient);

      dispatch({
        type: "inbox/FETCH_MESSAGES",
        payload: () => getMessages(graphQLClient, newTab?.filters),
      });
    },

    fetchMessages: (params?: IGetMessagesParams) => {
      dispatch({
        type: "inbox/FETCH_MESSAGES",
        payload: () => getMessages(graphQLClient, params),
      });
    },

    getUnreadMessageCount: (params?: IMessageCountParams) => {
      dispatch({
        type: "inbox/SET_UNREAD_MESSAGE_COUNT",
        payload: () => getUnreadMessageCount(graphQLClient, params),
      });
    },

    markMessageRead: async (messageId: string, trackingId: string) => {
      dispatch({
        type: "inbox/MARK_MESSAGE_READ",
        payload: {
          messageId,
        },
      });
      await createTrackEvent(trackingId);
    },

    markMessageUnread: async (messageId: string, trackingId: string) => {
      dispatch({
        type: "inbox/MARK_MESSAGE_UNREAD",
        payload: {
          messageId,
        },
      });
      await createTrackEvent(trackingId);
    },
    markAllAsRead: async () => {
      dispatch({
        type: "inbox/MARK_ALL_AS_READ",
      });
      await createBatchTrackEvent("read");
    },
  };
};

export default useInboxActions;

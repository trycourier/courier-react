import { useCourier } from "@trycourier/react-provider";
import { getUnreadMessageCount } from "~/actions/message-count";
import { getMessages, IGetMessagesParams } from "~/actions/messages";
import { DEFAULT_TABS } from "~/constants";

const useInboxActions = () => {
  const {
    inbox,
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

    setCurrentTab: (newTab: string) => {
      dispatch({
        type: "inbox/SET_CURRENT_TAB",
        payload: newTab,
      });
    },

    fetchMessages: (params: IGetMessagesParams) => {
      dispatch({
        type: "inbox/FETCH_MESSAGES",
        payload: () => getMessages(graphQLClient, params),
      });
    },

    getUnreadMessageCount: (params) => {
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
      const messageIds = inbox.messages.map(({ messageId }) => messageId);

      dispatch({
        type: "inbox/MARK_ALL_AS_READ",
      });
      await createBatchTrackEvent(messageIds, "read");
    },
  };
};

export default useInboxActions;

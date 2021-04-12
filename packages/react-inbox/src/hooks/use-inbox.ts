import { useEffect } from "react";
import { useCourier, useTrackEvent } from "@trycourier/react-provider";
import useMessages from "~/hooks/use-messages";
import { DEFAULT_TABS } from "~/constants";

export default () => {
  const { fetch: fetchMessages } = useMessages();
  const { dispatch, inbox, transport } = useCourier();
  const { trackEvent, batchTrackEvent } = useTrackEvent();
  const {
    messages,
    config,
    currentTab,
    isLoading,
    startCursor,
    unreadMessageCount,
  } = inbox || {};

  useEffect(() => {
    transport?.listen({
      id: "inbox-listener",
      listener: (courierEvent) => {
        dispatch({
          type: "inbox/NEW_MESSAGE",
          payload: courierEvent?.data,
        });
      },
    });
  }, [transport]);

  return {
    messages: messages || [],
    config,
    currentTab,
    isLoading,
    startCursor,
    unreadMessageCount,
    init: (payload) => {
      payload = {
        ...payload,
        config: {
          ...payload.config,
          tabs: payload.config.tabs ?? DEFAULT_TABS,
        },
      };

      dispatch({
        type: "inbox/INIT",
        payload,
      });
    },

    setCurrentTab: (newTab: string) => {
      dispatch({
        type: "inbox/SET_CURRENT_TAB",
        payload: newTab,
      });
    },

    fetchMessages: (params: {
      params?: {
        after?: string;
        isRead?: boolean;
      };
    }) => {
      dispatch({
        type: "inbox/FETCH_MESSAGES",
        payload: () => fetchMessages(params),
      });
    },

    setUnreadMessageCount: (unreadMessageCount: number) => {
      dispatch({
        type: "inbox/SET_UNREAD_MESSAGE_COUNT",
        payload: {
          unreadMessageCount,
        },
      });
    },

    markMessageRead: async (messageId: string, trackingId: string) => {
      dispatch({
        type: "inbox/MARK_MESSAGE_READ",
        payload: {
          messageId,
        },
      });
      await trackEvent({
        trackingId,
      });
    },

    markMessageUnread: async (messageId: string, trackingId: string) => {
      dispatch({
        type: "inbox/MARK_MESSAGE_UNREAD",
        payload: {
          messageId,
        },
      });
      await trackEvent({
        trackingId,
      });
    },
    markAllAsRead: async () => {
      const messageIds = inbox.messages.map(({ messageId }) => messageId);

      dispatch({
        type: "inbox/MARK_ALL_AS_READ",
      });
      await batchTrackEvent({
        eventType: "read",
        messageIds,
      });
    },
  };
};

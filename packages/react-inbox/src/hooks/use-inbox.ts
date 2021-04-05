import { useEffect, useCallback } from "react";
import { useCourier, useTrackEvent } from "@trycourier/react-provider";
import useMessages from "~/hooks/use-messages";

export default () => {
  const { fetch: fetchMessages } = useMessages();
  const {
    dispatch, inbox, transport,
  } = useCourier();

  const [_, trackEvent] = useTrackEvent();

  const newMessage = useCallback((payload) => {
    dispatch({
      type: "inbox/NEW_MESSAGE",
      payload,
    });
  }, [dispatch]);

  useEffect(() => {
    transport?.listen({
      id: "inbox-listener",
      listener: (courierEvent) => {
        newMessage(courierEvent?.data);
      },
    });
  }, [newMessage, transport]);

  return {
    ...inbox,

    init: (payload) => {
      payload = {
        ...payload,
        config: {
          ...payload.config,
          tabs: payload.config.tabs ?? [{
            id: "unread",
            label: "Unread",
            filter: {
              isRead: false,
            },
          }, {
            id: "all",
            label: "All Messages",
            filter: {},
          }]
        }
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
      }
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
      const unreadMessageCount = (inbox.unreadMessageCount ?? 1) + 1;

      await trackEvent({
        trackingId,
      });

      dispatch({
        type: "inbox/MARK_MESSAGE_READ",
        payload: {
          messageId,
          unreadMessageCount,
        },
      });
    },

    markMessageUnread: async (messageId: string, trackingId: string) => {
      await trackEvent({
        trackingId,
      });

      dispatch({
        type: "inbox/MARK_MESSAGE_UNREAD",
        payload: {
          messageId,
        },
      });
    },
  };
};

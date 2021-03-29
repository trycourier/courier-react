import { useEffect } from 'react';
import {useCourier} from '@trycourier/react-provider';
import useTrackEvent from "~/hooks/use-track-event";
import useMessages from "~/hooks/use-messages";

export default () => {
  const { fetch: fetchMessages } = useMessages();
  const { dispatch, inbox, transport } = useCourier();
  const [_, trackEvent] = useTrackEvent();

  const newMessage = (payload) => {
    dispatch({
      type: "inbox/NEW_MESSAGE",
      payload,
    });
  };

  const setLoading = (isLoading: boolean) => {
    dispatch({
      type: "inbox/SET_LOADING",
      payload: {
        isLoading,
      },
    });
  }

  useEffect(() => {
    transport?.listen({
      id: "inbox-listener",
      listener: (courierEvent) => {
        newMessage(courierEvent?.data);
      },
    });
  }, [transport]);

  return {
    ...inbox,

    setLoading,
    init: (payload) => {
      dispatch({
        type: "inbox/INIT",
        payload: {
          ...payload,
          tabs: payload.tabs ?? [{
            id: "unread",
            label: "Unread",
            filter: {
              isRead: false
            }
          }, {
            id: "all",
            label: "All Messages",
            filter: {}
          }]
        }
      });
    },

    setCurrentTab: (newTab: string) => {
      dispatch({
        type: "inbox/SET_CURRENT_TAB",
        payload: newTab
      });
    },

    fetchMessages: async (params: {
      params?: {
        after?: string;
        isRead?: boolean;
      }
    }) => {
      dispatch({
        type: "inbox/FETCH_MESSAGES",
        payload: () => fetchMessages(params)
      });
    },

    setHasUnreadMessages: (unreadMessageCount: number) => {
      dispatch({
        type: "inbox/SET_UNREAD_MESSAGE_COUNT",
        payload: {
          unreadMessageCount,
        },
      });
    },

    setMessages: (payload) => {
      dispatch({
        type: "inbox/SET_MESSAGES",
        payload,
      })
    },

    addMessages: (payload) => {
      dispatch({
        type: "inbox/ADD_MESSAGES",
        payload,
      })
    },

    setUnreadMessages: (payload) => {
      dispatch({
        type: "inbox/SET_UNREAD_MESSAGES",
        payload
      });
    },

    setAllMessages: (payload) => {
      dispatch({
        type: "inbox/SET_ALL_MESSAGES",
        payload
      });
    },

    markMessageRead: async (messageId: string, trackingId: string) => {
      await trackEvent({
        trackingId
      });

      dispatch({
        type: "inbox/MARK_MESSAGE_READ",
        payload: {
          messageId
        }
      });
    },

    markMessageUnread: async (messageId: string, trackingId: string) => {
      await trackEvent({
        trackingId
      });

      dispatch({
        type: "inbox/MARK_MESSAGE_UNREAD",
        payload: {
          messageId
        }
      });
    },

    newMessage
  };
};

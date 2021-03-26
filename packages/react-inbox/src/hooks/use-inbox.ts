import {useCourier} from '@trycourier/react-provider';
import useTrackEvent from "~/hooks/use-track-event";

export default () => {
  const { dispatch, inbox } = useCourier();
  const [_, trackEvent] = useTrackEvent();


  return {
    ...inbox,
    init: (payload) => {
      dispatch({
        type: "inbox/INIT",
        payload,
      });
    },

    setLoading: (isLoading: boolean) => {
      dispatch({
        type: "inbox/SET_LOADING",
        payload: {
          isLoading,
        },
      });
    },

    setHasUnreadMessages: (hasUnreadMessages: boolean) => {
      dispatch({
        type: "inbox/SET_HAS_UNREAD_MESSAGES",
        payload: {
          hasUnreadMessages,
        },
      });
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

    newMessage: (payload) => {
      dispatch({
        type: "inbox/NEW_MESSAGE",
        payload,
      });
    },
  };
};

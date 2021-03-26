import { useCourier } from "@trycourier/react-provider";

export default () => {
  const { dispatch, inbox } = useCourier();

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

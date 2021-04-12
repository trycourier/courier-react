import {
  registerReducer,
  useCourier,
  useTrackEvent,
} from "@trycourier/react-provider";
import { useCallback } from "react";
import useMessages from "~/hooks/use-messages";
import reducer from "~/reducer";

export const markAllAsRead = useCallback(
  async (dispatch) => async () => {
    const state = useCourier();
    const { batchTrackEvent } = useTrackEvent();
    const {
      inbox: { messages },
    } = state;
    const messageIds = messages.map(({ messageId }) => messageId);

    dispatch({
      type: "inbox/MARK_ALL_AS_READ",
    });
    await batchTrackEvent({
      eventType: "read",
      messageIds,
    });
  },
  []
);

export const initialize = useCallback(
  (dispatch) => ({
    clientKey,
    userId,
    tabs,
    unreadMessageCount = 0,
    messages = [],
    title,
  }) => {
    registerReducer("inbox", reducer);
    // const localStorageState = localStorage.getItem(
    //   `${clientKey}/${userId}/inbox`
    // );
    // console.log("localStorageState", localStorageState);
    // debugger;
    // if (false) {
    //   // try {
    //   //   payload = JSON.parse(localStorageState);
    //   // } catch (ex) {
    //   //   console.log("error", ex);
    //   //   // do nothing
    //   // }
    // } else {

    // }
    const payload = {
      config: {
        tabs,
        title,
      },
      unreadMessageCount,
      messages,
    };

    dispatch({
      type: "inbox/INIT",
      payload,
    });
  },
  []
);

export const setCurrentTab = useCallback(
  (dispatch) => (newTab) => {
    dispatch({
      type: "inbox/SET_CURRENT_TAB",
      payload: newTab,
    });
  },
  []
);

export const fetchMessages = useCallback(
  (dispatch) => ({ after = "", isRead = false }) => {
    const { fetch } = useMessages();
    dispatch({
      type: "inbox/FETCH_MESSAGES",
      payload: () => fetch({ after, isRead }),
    });
  },
  []
);

export const markMessageRead = useCallback(
  (dispatch) => async (messageId: string, trackingId: string) => {
    const { trackEvent } = useTrackEvent();
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
  []
);

export const markMessageUnread = useCallback(
  (dispatch) => async (messageId: string, trackingId: string) => {
    const { trackEvent } = useTrackEvent();
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
  []
);

import { useEffect } from "react";
import { useCourier } from "@trycourier/react-provider";
import useMessageCount from "./use-message-count";
import {
  initialize,
  setCurrentTab,
  fetchMessages,
  markMessageRead,
  markMessageUnread,
} from "../actions";

export default () => {
  const unreadMessageCount = useMessageCount();
  const { dispatch, inbox, transport } = useCourier();

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
  const { messages } = inbox;
  return {
    state: {
      messages,
      unreadMessageCount,
    },
    actions: wrapActions(
      {
        initialize,
        setCurrentTab,
        fetchMessages,
        markMessageRead,
        markMessageUnread,
      },
      dispatch
    ),
  };
};

function wrapActions(actions, dispatch) {
  const actionsWithDispatch = {};
  Object.keys(actions).map((functionName) => {
    actionsWithDispatch[functionName] = actions[functionName](dispatch);
  });
}

import { useEffect } from "react";
import { useCourier } from "@trycourier/react-provider";
import { usePreferencesActions } from "@trycourier/react-preferences";

import useInboxActions from "./use-inbox-actions";

const useInbox = () => {
  const { dispatch, inbox, transport, preferences } = useCourier();
  const actions = useInboxActions();
  const preferencesActions = usePreferencesActions();

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

  return { ...inbox, ...actions, ...preferencesActions, ...preferences };
};

export default useInbox;

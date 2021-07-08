import { useCourier } from "@trycourier/react-provider";
import { useEffect } from "react";
import {
  usePreferencesActions,
  PreferenceState,
} from "@trycourier/react-preferences";
import deepExtend from "deep-extend";

import useInboxActions from "./use-inbox-actions";
import { InboxState } from "../reducer";

const useInbox = () => {
  const { dispatch, inbox, transport, preferences, brand } = useCourier<{
    inbox: InboxState;
    preferences: PreferenceState;
  }>();

  const actions = useInboxActions();
  const preferencesActions = usePreferencesActions();

  if (inbox) {
    inbox.brand = deepExtend({}, brand, inbox.brand);
  }

  useEffect(() => {
    transport?.listen({
      id: "inbox-listener",
      listener: (courierEvent) => {
        if (!dispatch) {
          return;
        }

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

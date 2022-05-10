import { useCourier, registerReducer } from "@trycourier/react-provider";
import { useEffect } from "react";
import reducer from "./reducer";

import deepExtend from "deep-extend";

import useInboxActions from "./use-inbox-actions";
import { IInbox } from "./types";

const useInbox = () => {
  const { dispatch, inbox, transport, brand } = useCourier<{
    inbox: IInbox;
  }>();

  const actions = useInboxActions();

  if (inbox) {
    inbox.brand = deepExtend({}, brand ?? {}, inbox.brand ?? {});
  }

  useEffect(() => {
    registerReducer("inbox", reducer);
  }, []);

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

  return { ...inbox, ...actions };
};

export default useInbox;

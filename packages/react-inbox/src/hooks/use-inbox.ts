import { useEffect } from "react";
import { useCourier } from "@trycourier/react-provider";
import useInboxActions from "./use-inbox-actions";

const useInbox = () => {
  const { dispatch, inbox, transport } = useCourier();
  const actions = useInboxActions();
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

  return { ...inbox, ...actions };
};

export default useInbox;

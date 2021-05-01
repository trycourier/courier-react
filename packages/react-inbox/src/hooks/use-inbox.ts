import { useEffect } from "react";
import { useCourier } from "@trycourier/react-provider";
import useInboxActions from "./use-inbox-actions";

const useInbox = (cb?: (state: any) => any) => {
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

  if (cb) {
    const response = cb({ ...inbox, ...actions });

    console.log("response", response);
    return response;
  }

  return { ...inbox, ...actions };
};

export default useInbox;

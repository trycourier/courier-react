import { useEffect } from "react";
import { useCourier } from "@trycourier/react-provider";

const useInbox = () => {
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

  return { ...inbox };
};

export default useInbox;

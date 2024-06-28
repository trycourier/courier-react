import { ICourierContext, useCourier } from "@trycourier/react-provider";
import { useEffect } from "react";
import { IToastConfig } from "../types";
import { UseToast, ToastCaller } from "./types";

export const useToast: UseToast = () => {
  const { toast, clientKey } =
    useCourier<{
      toast?: {
        toast: ToastCaller;
        config?: IToastConfig;
      };
    }>();
  const toastCaller = toast?.toast ? toast.toast : () => {};
  return [
    toastCaller,
    {
      config: toast?.config ?? {},
      clientKey,
    },
  ];
};

export const useListenForTransportEvent = ({
  transport,
  handleToast,
}: {
  transport: ICourierContext["transport"];
  handleToast;
}) => {
  useEffect(() => {
    if (!transport) {
      return;
    }

    transport.listen({
      id: "toast-listener",
      type: "message",
      listener: (courierEvent) => {
        handleToast(courierEvent?.data);
      },
    });
  }, [handleToast, transport]);
};

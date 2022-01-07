import { ICourierContext, useCourier } from "@trycourier/react-provider";
import { useEffect } from "react";
import { IToastConfig } from "../types";
import { UseToast, ToastCaller } from "./types";

export const useToast: UseToast = () => {
  const { toast, clientKey } = useCourier<{
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

export const useListenForTransportEvent = (
  clientKey: string,
  transport: ICourierContext["transport"],
  handleToast
) => {
  const { createTrackEvent } = useCourier();

  useEffect(() => {
    console.log("transport", transport);
    if (!transport) {
      return;
    }

    transport.listen({
      id: "toast-listener",
      listener: (courierEvent) => {
        console.log("courierEvent", courierEvent);
        const courierData = courierEvent?.data?.data;

        if (clientKey && courierData?.deliverTrackingId) {
          createTrackEvent({
            trackingId: courierData?.deliverTrackingId,
          });
        }

        handleToast(courierEvent?.data);
      },
    });
  }, [createTrackEvent, clientKey, handleToast, transport]);
};

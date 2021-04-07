import {
  ICourierContext,
  useCourier,
  useTrackEvent,
} from "@trycourier/react-provider";
import { useEffect } from "react";
import { IToastConfig } from "../types";
import { UseToast, ToastCaller } from "./types";

export const useToast: UseToast = () => {
  const { toast, clientKey } = useCourier<{
    toast: {
      toast: ToastCaller;
      config?: IToastConfig;
    };
  }>();

  return [
    toast?.toast,
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
  const { trackEvent } = useTrackEvent();

  useEffect(() => {
    if (!transport) {
      return;
    }

    transport.listen({
      id: "toast-listener",
      listener: (courierEvent) => {
        const courierData = courierEvent?.data?.data;

        if (clientKey && courierData?.deliverTrackingId) {
          trackEvent({
            trackingId: courierData?.deliverTrackingId,
          });
        }

        handleToast(courierEvent?.data);
      },
    });
  }, [trackEvent, clientKey, handleToast, transport]);
};

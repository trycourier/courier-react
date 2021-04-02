import { ICourierContext, useCourier, useTrackEvent } from "@trycourier/react-provider";
import { UseToast, ToastCaller } from "./types";
import { IToastConfig } from '../types';

import { useEffect } from "react";

export const useToast: UseToast = () => {
  const {toast, toastConfig, clientKey} = useCourier<{
    toast: ToastCaller,
    toastConfig?: IToastConfig
  }>();

  return [toast, { 
      config: toastConfig ?? {}, 
      clientKey 
  }];
};

export const useListenForTransportEvent = (clientKey: string, transport: ICourierContext["transport"], handleToast) => {
  const [_, trackEvent] = useTrackEvent();

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
            trackingId: courierData?.deliverTrackingId
          });
        }

        handleToast(courierEvent?.data);
      }
    });
  }, [clientKey, handleToast, transport]);
}

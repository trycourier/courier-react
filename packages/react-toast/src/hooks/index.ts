import { ICourierContext, useCourier } from "@trycourier/react-provider";
import { UseToast, ToastCaller } from "./types";
import { IToastConfig } from '../types';

import { useEffect } from "react";
import { COURIER_CLIENT_HEADER } from "../constants";

export const useToast: UseToast = () => {
  const {toast, toastConfig, clientKey} = useCourier<{
    toast: ToastCaller,
    toastConfig?: IToastConfig
  }>();

  return [toast, { config: toastConfig ?? {}, clientKey }];
};

export const useListenForTransportEvent = (clientKey: string, transport: ICourierContext["transport"], handleToast) => {
  useEffect(() => {
    if (!transport) {
      return;
    }

    transport.listen((courierEvent) => {
      const courierData = courierEvent?.data?.data;

      if (clientKey && courierData?.deliveredUrl) {
        fetch(`${courierData?.deliveredUrl}`, {
          method: "POST",
          headers: {
            [COURIER_CLIENT_HEADER]: clientKey,
          },
        });
      }

      handleToast(courierEvent?.data);
    });
  }, [clientKey, handleToast, transport]);
}

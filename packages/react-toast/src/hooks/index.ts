import {
  ICourierContext,
  useCourier,
  useTrackEvent,
} from "@trycourier/react-provider";
import { useCallback, useEffect } from "react";
import { ICourierToastMessage } from "~/components/Toast/types";
import { IToastConfig } from "../types";
import { UseToast, ToastCaller } from "./types";

export const useToast: UseToast = () => {
  const { toast, clientKey } = useCourier<{
    toast: {
      toast: ToastCaller;
      config?: IToastConfig;
    };
  }>();
  const toastCaller = useCallback(
    (message: ICourierToastMessage) => {
      toast?.toast(message);
    },
    [toast]
  );
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

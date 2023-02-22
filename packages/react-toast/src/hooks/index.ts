import {
  IActionBlock,
  ICourierContext,
  ICourierMessage,
  ITextBlock,
  useCourier,
} from "@trycourier/react-provider";
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

export const useListenForTransportEvent = (
  clientKey: string,
  transport: ICourierContext["transport"],
  handleToast
) => {
  const { createTrackEvent } = useCourier();

  useEffect(() => {
    if (!transport) {
      return;
    }

    transport.listen({
      id: "toast-listener",
      type: "message",
      listener: (courierEvent) => {
        const courierMessage = courierEvent?.data as ICourierMessage;
        courierMessage.body = courierMessage.body ?? courierMessage.preview;
        courierMessage.blocks =
          courierMessage.blocks ??
          ([
            {
              type: "text",
              text: courierMessage.preview,
            },
            ...(courierMessage?.actions ?? []).map((a) => ({
              type: "action",
              text: a.content,
              url: a.href,
            })),
          ] as Array<IActionBlock | ITextBlock>);
        const courierData = courierMessage?.data;
        if (courierData?.trackingIds?.deliverTrackingId) {
          createTrackEvent(courierData?.trackingIds?.deliverTrackingId);
        }

        handleToast(courierEvent?.data);
      },
    });
  }, [clientKey, handleToast, transport]);
};

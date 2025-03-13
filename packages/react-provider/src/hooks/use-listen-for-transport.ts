import { IInboxMessagePreview } from "@trycourier/core";
import { ICourierContext } from "..";
import { useEffect } from "react";

export const useListenForTransportEvent = ({
  transport,
  createTrackEvent,
}: {
  transport: ICourierContext["transport"];
  createTrackEvent: (trackingId: string) => void;
}) => {

  useEffect(() => {
    if (!transport) {
      return;
    }

    transport.listen({
      id: "websocket-delivery-listener",
      type: "message",
      listener: (courierEvent) => {
        const courierMessage = courierEvent?.data as IInboxMessagePreview;
        const courierData = courierMessage?.data;
        if (courierData?.trackingIds?.deliverTrackingId) {
          createTrackEvent(courierData?.trackingIds?.deliverTrackingId);
        }
      },
    });
  }, [createTrackEvent, transport]);
};

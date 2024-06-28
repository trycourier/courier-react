import { IInboxMessagePreview } from "@trycourier/core";
import { ICourierContext, useCourier } from "..";
import { useEffect } from "react";

export const useListenForTransportEvent = ({
  transport,
}: {
  transport: ICourierContext["transport"];
}) => {
  const { createTrackEvent } = useCourier();

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
  }, [transport]);
};

import { useMemo } from "react";
import { Transport, CourierTransport } from "~/transports";
import { useWhyDidYouUpdate } from "./use-why-did-you-update";

const useCourierTransport = ({
  authorization,
  clientSourceId,
  clientKey,
  transport,
  userSignature,
  wsOptions,
}): Transport => {
  useWhyDidYouUpdate("transport", {
    authorization,
    clientSourceId,
    clientKey,
    transport,
    userSignature,
    wsOptions,
  });
  return useMemo(() => {
    if (transport) {
      return transport;
    }

    if ((clientKey || authorization) && !transport) {
      console.log("new transport");
      return new CourierTransport({
        authorization,
        clientSourceId,
        clientKey,
        userSignature,
        wsOptions,
      });
    }
  }, [authorization, clientKey, transport, userSignature, wsOptions]);
};

export default useCourierTransport;

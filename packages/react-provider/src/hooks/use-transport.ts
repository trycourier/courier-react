import { useMemo } from "react";
import { Transport, CourierTransport } from "~/transports";
import { useWhyDidYouUpdate } from "./use-why-did-you-update";

const useCourierTransport = ({
  transport,
  authorization,
  clientKey,
  userSignature,
  wsOptions,
}): Transport => {
  useWhyDidYouUpdate("transport", {
    authorization,
    clientKey,
    transport,
    userSignature,
    wsOptions,
  });

  return useMemo(() => {
    if (transport) {
      return transport;
    }

    if (clientKey && !transport) {
      return new CourierTransport({
        authorization,
        userSignature,
        clientKey,
        wsOptions,
      });
    }
  }, [authorization, clientKey, transport, userSignature, wsOptions]);
};

export default useCourierTransport;

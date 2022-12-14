import { useMemo } from "react";
import { Transport, CourierTransport } from "~/transports";

const useCourierTransport = ({
  authorization,
  clientSourceId,
  clientKey,
  transport,
  userSignature,
  wsOptions,
}): Transport => {
  return useMemo(() => {
    if (transport) {
      return transport;
    }

    if ((clientKey || authorization) && !transport) {
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

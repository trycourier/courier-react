import { useMemo } from "react";
import { Transport, CourierTransport } from "~/transports";

const useCourierTransport = ({
  transport,
  authorization,
  clientKey,
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
        userSignature,
        clientKey,
        wsOptions,
      });
    }
  }, [authorization, clientKey, transport, userSignature, wsOptions]);
};

export default useCourierTransport;

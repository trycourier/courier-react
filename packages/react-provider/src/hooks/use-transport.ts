import { useMemo } from "react";
import { Transport, CourierTransport } from "~/transports";

const useCourierTransport = ({
  transport,
  clientKey,
  userSignature,
  wsOptions,
}): Transport => {
  return useMemo(() => {
    if (transport) {
      return transport;
    }

    if (clientKey && !transport) {
      return new CourierTransport({
        userSignature,
        clientKey,
        wsOptions,
      });
    }
  }, [transport, clientKey, wsOptions, userSignature]);
};

export default useCourierTransport;

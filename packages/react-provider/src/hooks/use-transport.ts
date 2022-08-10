import { useMemo } from "react";
import { CourierTransport } from "~/transports/courier";

const useCourierTransport = ({
  transport,
  clientKey,
  userSignature,
  wsOptions,
}) => {
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

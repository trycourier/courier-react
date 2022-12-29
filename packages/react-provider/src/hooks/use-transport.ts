import { useMemo, useRef } from "react";
import { Transport, CourierTransport } from "~/transports";
import jwtDecode from "jwt-decode";
interface DecodedAuth {
  scope: string;
  tenantId: string;
}

const useCourierTransport = ({
  authorization,
  clientSourceId,
  clientKey,
  transport,
  userSignature,
  wsOptions,
}): Transport => {
  const transportRef =
    useRef<{
      authorization: string;
      transport: Transport;
    }>();

  return useMemo(() => {
    if (transport) {
      return transport;
    }

    if (
      authorization &&
      transportRef?.current?.authorization &&
      transportRef?.current.transport
    ) {
      const oldDecodedAuth = jwtDecode(
        transportRef?.current?.authorization
      ) as DecodedAuth;
      const newDecodedAuth = jwtDecode(authorization) as DecodedAuth;

      if (
        oldDecodedAuth.scope === newDecodedAuth.scope &&
        oldDecodedAuth.tenantId === newDecodedAuth.tenantId
      ) {
        return transportRef?.current.transport;
      }
    }

    if (!clientKey && !authorization) {
      throw new Error("Missing ClientKey or Authorization");
    }

    const newTransport = new CourierTransport({
      authorization,
      clientSourceId,
      clientKey,
      userSignature,
      wsOptions,
    });

    transportRef.current = {
      authorization,
      transport: newTransport,
    };
    return newTransport;
  }, [authorization, clientKey, transport, userSignature, wsOptions]);
};

export default useCourierTransport;

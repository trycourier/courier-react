import { useMemo, useRef } from "react";
import {
  CourierTransport,
  Transport,
  ITransportOptions,
} from "@trycourier/transport";
import jwtDecode from "jwt-decode";
interface DecodedAuth {
  scope: string;
  tenantId: string;
}

const useTransport = ({
  tenantId,
  authorization,
  clientSourceId,
  clientKey,
  transport,
  userSignature,
  wsOptions,
}: {
  tenantId?: string;
  authorization?: string;
  clientSourceId?: string;
  clientKey?: string;
  transport?: CourierTransport | Transport;
  userSignature?: string;
  wsOptions?: ITransportOptions["wsOptions"];
}): CourierTransport | Transport | undefined => {
  const transportRef =
    useRef<{
      authorization: string;
      transport: CourierTransport;
    }>();

  const newTransport = useMemo(() => {
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
        transportRef.current.transport.renewSession(authorization);
        return transportRef.current.transport;
      }
    }

    if (!clientKey && !authorization) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("Courier: Missing ClientKey or Authorization");
      }
      return;
    }

    if (!clientSourceId) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("Courier: Missing ClientSourceId");
      }
      return;
    }

    const newTransport = new CourierTransport({
      tenantId,
      authorization,
      clientSourceId,
      clientKey,
      userSignature,
      wsOptions,
    });

    // keep track of the transport so we don't reconnect when we don't have to
    if (authorization) {
      transportRef.current = {
        authorization,
        transport: newTransport,
      };
    }
    return newTransport;
  }, [tenantId, authorization, clientKey, transport, userSignature, wsOptions]);

  return newTransport;
};

export default useTransport;

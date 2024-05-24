import { useMemo, useRef, useEffect } from "react";
import { CourierTransport, TransportOptions } from "@trycourier/transport";
import jwtDecode from "jwt-decode";
interface DecodedAuth {
  scope: string;
  tenantId: string;
}

const useTransport = ({
  authorization,
  clientKey,
  clientSourceId,
  isOnline,
  tenantId,
  transport,
  userSignature,
  wsOptions,
}: {
  authorization?: string;
  clientKey?: string;
  clientSourceId?: string;
  isOnline?: boolean;
  tenantId?: string;
  transport?: CourierTransport;
  userSignature?: string;
  wsOptions?: TransportOptions["wsOptions"];
}): CourierTransport | undefined => {
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

    if (authorization) {
      const courierTransport = new CourierTransport({
        tenantId,
        authorization,
        clientSourceId,
        wsOptions,
      });

      // keep track of the transport so we don't reconnect when we don't have to
      transportRef.current = {
        authorization,
        transport: courierTransport,
      };

      return courierTransport;
    }

    if (clientKey) {
      const courierTransport = new CourierTransport({
        tenantId,
        clientSourceId,
        clientKey,
        userSignature,
        wsOptions,
      });

      return courierTransport;
    }
  }, [tenantId, authorization, clientKey, transport, userSignature, wsOptions]);

  const isConnected = newTransport?.isConnected
    ? newTransport?.isConnected()
    : undefined;
  useEffect(() => {
    if (!(newTransport instanceof CourierTransport)) {
      return;
    }

    if (!isOnline && isConnected) {
      newTransport.closeConnection();
    }

    if (isOnline && !isConnected) {
      newTransport.connect();
    }
  }, [newTransport, isConnected, isOnline]);

  return newTransport;
};

export default useTransport;

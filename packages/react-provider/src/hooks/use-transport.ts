import { useMemo, useRef } from "react";
import { CourierTransport, Transport } from "~/transports";
import jwtDecode from "jwt-decode";
import { ITransportOptions } from "~/transports/courier/types";
interface DecodedAuth {
  scope: string;
  tenantId: string;
}

const useTransport = ({
  accountId,
  authorization,
  clientSourceId,
  clientKey,
  transport,
  userSignature,
  wsOptions,
}: {
  accountId?: string;
  authorization?: string;
  clientSourceId?: string;
  clientKey?: string;
  transport?: CourierTransport | Transport;
  userSignature?: string;
  wsOptions?: ITransportOptions["wsOptions"];
}): CourierTransport | Transport => {
  const transportRef =
    useRef<{
      authorization: string;
      transport: CourierTransport;
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
        transportRef.current.transport.renewSession(authorization);
        return transportRef.current.transport;
      }
    }

    if (!clientKey && !authorization) {
      throw new Error("Missing ClientKey or Authorization");
    }

    if (!clientSourceId) {
      throw new Error("Missing ClientSourceId");
    }

    const newTransport = new CourierTransport({
      accountId,
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
  }, [accountId, authorization, clientKey, transport, userSignature, wsOptions]);
};

export default useTransport;

import React, { useReducer, useEffect, useMemo } from "react";
import * as types from "./types";

export * from "./transports";
export * from "./hooks";
export { registerReducer } from "./reducer";

import * as TransportTypes from "./transports/types";
import reducer, { IAction } from "./reducer";

import { CourierTransport } from "./transports/courier";

export type ICourierMessage = TransportTypes.ICourierMessage;
export type ICourierContext = types.ICourierContext;
export const CourierContext = React.createContext<ICourierContext | undefined>(
  undefined
);

export const CourierProvider: React.FunctionComponent<ICourierContext> = ({
  apiUrl,
  children,
  clientKey,
  transport,
  userId,
  userSignature,
  wsUrl,
}) => {
  transport = useMemo(() => {
    if (transport) {
      return transport;
    }

    if (!clientKey) {
      return;
    }

    return new CourierTransport({
      clientKey,
      wsUrl,
    });
  }, [transport, clientKey, wsUrl]);

  const [context, dispatch] = useReducer<
    React.Reducer<ICourierContext, IAction>
  >(reducer, {
    apiUrl,
    clientKey,
    transport,
    userId,
    userSignature,
  });

  useEffect(() => {
    if (!transport || !userId) {
      return;
    }

    const courierTransport = transport as CourierTransport;
    courierTransport.subscribe(userId);

    return () => {
      courierTransport.unsubscribe(userId);
    };
  }, [transport, userId]);

  useEffect(() => {
    dispatch({
      type: "root/INIT",
      payload: {
        apiUrl,
        clientKey,
        transport,
        userId,
        userSignature,
      },
    });
  }, [apiUrl, clientKey, transport, userId, userSignature]);

  return (
    <CourierContext.Provider
      value={{
        ...context,
        dispatch,
      }}
    >
      {children}
    </CourierContext.Provider>
  );
};

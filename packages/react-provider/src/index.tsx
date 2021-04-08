import React, { useEffect, useMemo } from "react";
import createReducer from "react-use/lib/factory/createReducer";
import { Provider } from "urql";
import * as types from "./types";

import useGraphQlClient from "./hooks/use-graphql-client";

import { CourierTransport } from "./transports/courier";
import * as TransportTypes from "./transports/types";
import reducer, { registerReducer as _registerReducer } from "./reducer";

import middleware from "./middleware";

export * from "./transports";
export * from "./hooks";

const useReducer = createReducer(...middleware);

export const registerReducer = _registerReducer;
export type ICourierMessage = TransportTypes.ICourierMessage;
export type ICourierContext = types.ICourierContext;
export const CourierContext = React.createContext<ICourierContext | undefined>(
  undefined
);

const GraphQLProvider: React.FunctionComponent = ({ children }) => {
  const client = useGraphQlClient();
  return <Provider value={client}>{children}</Provider>;
};

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

  const [state, dispatch] = useReducer(reducer, {
    apiUrl,
    clientKey,
    transport,
    userId,
    userSignature,
  });

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

  useEffect(() => {
    if (transport && userId) {
      (transport as CourierTransport).subscribe(userId);
    }
    return () => {
      courierTransport.unsubscribe(userId);
    };
  }, [transport, userId]);

  if (!transport || !userId) {
    return null;
  }
  return (
    <CourierContext.Provider
      value={{
        ...(state as any),
        dispatch,
      }}
    >
      <GraphQLProvider>{children}</GraphQLProvider>
    </CourierContext.Provider>
  );
};

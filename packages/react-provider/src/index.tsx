import React, { useReducer, useEffect, useMemo } from "react";
import * as types from "./types";
import { Provider } from "urql";

export * from "./transports";
export * from "./hooks";

import useGraphQlClient from "./hooks/use-graphql-client";
import { CourierTransport } from "./transports/courier";
import * as TransportTypes from "./transports/types";
import reducer, {
  IAction,
  registerReducer as _registerReducer,
} from "./reducer";

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
      <GraphQLProvider>{children}</GraphQLProvider>
    </CourierContext.Provider>
  );
};

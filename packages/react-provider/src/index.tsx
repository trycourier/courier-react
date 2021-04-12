import React, { useEffect, useMemo } from "react";
import createReducer from "react-use/lib/factory/createReducer";
import { Provider } from "urql";
import { Client } from "@urql/core";
import * as types from "./types";

import useGraphQlClient from "./hooks/use-graphql-client";

import { CourierTransport } from "./transports/courier";
import * as TransportTypes from "./transports/types";
import reducer, { registerReducer as _registerReducer } from "./reducer";

import middleware from "./middleware";
import { getBrand } from "./actions/brand";

export * from "./transports";
export * from "./hooks";

const useReducer = createReducer(...middleware);

export const registerReducer = _registerReducer;
export type ICourierMessage = TransportTypes.ICourierMessage;
export type ICourierContext = types.ICourierContext;
export const CourierContext = React.createContext<ICourierContext | undefined>(
  undefined
);

const GraphQLProvider: React.FunctionComponent<{ client: Client }> = ({
  children,
  client,
}) => {
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
  brand,
  brandId,
}) => {
  const client = useGraphQlClient({ clientKey, userId, userSignature, apiUrl });
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
    brandId,
    brand,
  });

  useEffect(() => {
    if (clientKey && userId) {
      dispatch({
        type: "root/INIT",
        payload: {
          apiUrl,
          clientKey,
          transport,
          userId,
          userSignature,
          brandId,
        },
      });
      dispatch({
        type: "root/GET_BRAND",
        payload: () => getBrand(client, brandId),
      });
    }
  }, [apiUrl, clientKey, transport, userId, userSignature, brandId]);

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

  return (
    <CourierContext.Provider
      value={{
        ...(state as any),
        dispatch,
      }}
    >
      <GraphQLProvider client={client}>{children}</GraphQLProvider>
    </CourierContext.Provider>
  );
};

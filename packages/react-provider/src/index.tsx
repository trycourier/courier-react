import React, { useCallback, useEffect, useMemo } from "react";
import createReducer from "react-use/lib/factory/createReducer";
import Client from "./graph-ql";
import { ICourierProviderProps, ICourierContext, Brand } from "./types";

import { CourierTransport } from "./transports/courier";
import { ICourierMessage, ITextBlock, IActionBlock } from "./transports/types";
import reducer, { registerReducer as _registerReducer } from "./reducer";
import defaultMiddleware from "./middleware";
import { getBrand } from "./actions/brand";
import useCourierActions from "./hooks/use-courier-actions";
export * from "./transports";
export * from "./hooks";

export const registerReducer = _registerReducer;

export type {
  Brand,
  ITextBlock,
  IActionBlock,
  ICourierMessage,
  ICourierContext,
};

export const CourierContext = React.createContext<ICourierContext | undefined>(
  undefined
);

export const CourierProvider: React.FunctionComponent<ICourierProviderProps> = ({
  apiUrl,
  brand,
  brandId,
  children,
  clientKey,
  middleware: _middleware = [],
  onMessage,
  transport: _transport,
  userId,
  userSignature,
  wsUrl,
}) => {
  const middleware = [..._middleware, ...defaultMiddleware];
  const useReducer = useCallback(
    createReducer<any, ICourierContext>(...middleware),
    [_middleware]
  );
  const graphQLClient = useMemo(() => {
    return new Client({ clientKey, userId, userSignature, apiUrl });
  }, [clientKey, userId, userSignature, apiUrl]);

  const transport = useMemo(() => {
    if (_transport) {
      return _transport;
    }

    if (clientKey && !_transport) {
      return new CourierTransport({
        clientKey,
        wsUrl,
      });
    }
  }, [_transport, clientKey, wsUrl]);

  console.log("transport", transport);

  const [state, dispatch] = useReducer(reducer, {
    apiUrl,
    brand,
    brandId,
    graphQLClient,
    clientKey,
    transport,
    userId,
    userSignature,
    middleware,
  });

  useEffect(() => {
    if (_transport) {
      // this means the transport was passed in and we shouldn't subscribe
      return;
    }

    if (!transport || !userId) {
      return;
    }

    const courierTransport = transport as CourierTransport;
    courierTransport.subscribe(userId);

    if (onMessage) {
      courierTransport.intercept(onMessage);
    }

    return () => {
      courierTransport.unsubscribe(userId);
    };
  }, [transport, userId]);

  useEffect(() => {
    if (!_transport && (!clientKey || !userId)) {
      return;
    }

    dispatch({
      type: "root/INIT",
      payload: {
        apiUrl,
        brandId,
        graphQLClient,
        clientKey,
        transport,
        userId,
        userSignature,
      },
    });
  }, [
    apiUrl,
    graphQLClient,
    clientKey,
    transport,
    userId,
    userSignature,
    brandId,
  ]);

  useEffect(() => {
    if (brand) {
      // if we pass in brand, don't fetch it
      return;
    }

    if (!graphQLClient.client) {
      return;
    }

    dispatch({
      type: "root/GET_BRAND",
      payload: () => getBrand(graphQLClient, brandId),
    });
  }, [graphQLClient, brand, brandId]);

  useEffect(() => {
    if (!state.brand || !clientKey || !userId) {
      return;
    }

    localStorage.setItem(
      `${clientKey}/${userId}/provider`,
      JSON.stringify({
        brand: state.brand,
      })
    );
  }, [state.brand, clientKey, userId]);

  useEffect(() => {
    if (!clientKey || !userId) {
      return;
    }

    const localStorageState = localStorage.getItem(
      `${clientKey}/${userId}/provider`
    );

    if (localStorageState) {
      try {
        const { brand } = JSON.parse(localStorageState);
        dispatch({
          type: "root/GET_BRAND/DONE",
          payload: brand,
        });
      } catch (ex) {
        console.log("error", ex);
      }
    }
  }, [clientKey, userId]);

  const actions = useCourierActions(dispatch);

  return (
    <CourierContext.Provider
      value={{
        ...(state as any),
        ...actions,
        dispatch,
      }}
    >
      {children}
    </CourierContext.Provider>
  );
};

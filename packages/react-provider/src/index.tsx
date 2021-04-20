import React, { useEffect, useMemo } from "react";
import createReducer from "react-use/lib/factory/createReducer";
import Client from "./graph-ql";
import * as types from "./types";
import { CourierTransport } from "./transports/courier";
import * as TransportTypes from "./transports/types";
import reducer, { registerReducer as _registerReducer } from "./reducer";
import middleware from "./middleware";
import { getBrand } from "./actions/brand";
import useCourierActions from "./hooks/use-courier-actions";
export * from "./transports";
export * from "./hooks";
export * from "./types";

const useReducer = createReducer<any, ICourierContext>(...middleware);

export const registerReducer = _registerReducer;
export type ICourierMessage = TransportTypes.ICourierMessage;
export type ICourierContext = types.ICourierContext;
export const CourierContext = React.createContext<ICourierContext | undefined>(
  undefined
);

export const CourierProvider: React.FunctionComponent<ICourierContext> = ({
  apiUrl,
  brand,
  brandId,
  children,
  clientKey,
  transport: _transport,
  userId,
  userSignature,
  wsUrl,
}) => {
  const graphQLClient = useMemo(() => {
    return new Client({ clientKey, userId, userSignature, apiUrl });
  }, [clientKey, userId, userSignature, apiUrl]);

  const courierTransport = useMemo(() => {
    if (clientKey && !_transport) {
      return new CourierTransport({
        clientKey,
        wsUrl,
      });
    }
  }, [clientKey, wsUrl]);

  const transport = courierTransport || _transport;

  const [state, dispatch] = useReducer(reducer, {
    apiUrl,
    brand,
    brandId,
    graphQLClient,
    clientKey,
    transport,
    userId,
    userSignature,
  });

  useEffect(() => {
    if (clientKey && userId) {
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
    }
  }, [apiUrl, clientKey, transport, userId, userSignature, brandId]);

  useEffect(() => {
    if (brand) {
      // if we pass in brand, don't fetch it
      return;
    }

    dispatch({
      type: "root/GET_BRAND",
      payload: () => getBrand(graphQLClient, brandId),
    });
  }, [brand, brandId]);

  useEffect(() => {
    if (!state.brand) {
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

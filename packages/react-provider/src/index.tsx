if (typeof window !== "undefined") {
  (window as any).global = window;
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  window.Buffer = window.Buffer || require("buffer").Buffer;
}

import React, { useCallback, useEffect, useMemo } from "react";
import createReducer from "react-use/lib/factory/createReducer";
import {
  ICourierProviderProps,
  ICourierContext,
  Brand,
  WSOptions,
} from "./types";

import { CourierTransport } from "./transports/courier";
import { ICourierMessage, ITextBlock, IActionBlock } from "./transports/types";
import reducer, { registerReducer as _registerReducer } from "./reducer";
import defaultMiddleware from "./middleware";
import useCourierActions from "./hooks/use-courier-actions";
export * from "./transports";
export * from "./hooks";

export const registerReducer = _registerReducer;

export type {
  Brand,
  WSOptions,
  ITextBlock,
  IActionBlock,
  ICourierMessage,
  ICourierContext,
};

export const CourierContext =
  React.createContext<ICourierContext | undefined>(undefined);

export const CourierProvider: React.FunctionComponent<ICourierProviderProps> =
  ({
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
    wsOptions,
  }) => {
    const middleware = [..._middleware, ...defaultMiddleware];
    const useReducer = useCallback(
      createReducer<any, ICourierContext>(...middleware),
      [_middleware]
    );

    const transport = useMemo(() => {
      if (_transport) {
        return _transport;
      }

      if (clientKey && !_transport) {
        return new CourierTransport({
          userSignature,
          clientKey,
          wsOptions,
        });
      }
    }, [_transport, clientKey, wsOptions, userSignature]);

    const [state, dispatch] = useReducer(reducer, {
      apiUrl,
      brand,
      brandId,
      clientKey,
      transport,
      userId,
      userSignature,
      middleware,
    });

    const actions = useCourierActions(state, dispatch);

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

      courierTransport.listen({
        id: "deliver-tracking",
        listener: (courierEvent) => {
          const courierData = courierEvent?.data?.data;
          if (!courierData?.trackingIds?.deliverTrackingId) {
            return;
          }

          actions.createTrackEvent(courierData?.trackingIds?.deliverTrackingId);
        },
      });

      return () => {
        courierTransport.unsubscribe(userId);
      };
    }, [transport, userId]);

    useEffect(() => {
      if (!_transport && (!clientKey || !userId)) {
        return;
      }

      actions.init({
        apiUrl,
        brandId,
        clientKey,
        transport,
        userId,
        userSignature,
      });
    }, [apiUrl, clientKey, transport, userId, userSignature, brandId]);

    useEffect(() => {
      if (brand) {
        // if we pass in brand, don't fetch it
        return;
      }

      if (!clientKey || !userId) {
        return;
      }

      actions.getBrand(brandId);
    }, [actions, brand, brandId, clientKey, userId]);

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
          actions.setBrand(brand);
        } catch (ex) {
          console.log("error", ex);
        }
      }
    }, [clientKey, userId]);

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

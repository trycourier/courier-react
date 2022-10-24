if (typeof window !== "undefined") {
  (window as any).global = window;
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  window.Buffer = window.Buffer || require("buffer").Buffer;
}

import React, { useCallback, useEffect } from "react";
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
import useTransport from "./hooks/use-transport";

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
    authorization,
    brand,
    brandId,
    children,
    clientKey,
    disableTransport, // Note: For now, disable transport also means disable non push-provider-bound requests
    localStorage = window?.localStorage,
    middleware: _middleware = [],
    onMessage,
    transport: _transport,
    userId,
    userSignature,
    wsOptions,
  }) => {
    const middleware = [..._middleware, ...defaultMiddleware];
    const useReducer = useCallback(
      createReducer<any, Partial<ICourierContext>>(...middleware),
      [_middleware]
    );

    const transport =
      disableTransport || typeof window === "undefined"
        ? undefined
        : useTransport({
            authorization,
            clientKey,
            transport: _transport,
            userSignature,
            wsOptions,
          });

    const [state, dispatch] = useReducer(reducer, {
      apiUrl,
      authorization,
      brand,
      brandId,
      clientKey,
      localStorage,
      middleware,
      transport,
      userId,
      userSignature,
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

      return () => {
        courierTransport.unsubscribe(userId);
      };
    }, [actions, transport, userId]);

    useEffect(() => {
      if (!_transport && (!clientKey || !userId)) {
        return;
      }

      if (disableTransport) {
        return;
      }

      actions.init({
        apiUrl,
        authorization,
        brandId,
        clientKey,
        localStorage,
        transport,
        userId,
        userSignature,
      });
    }, [
      actions,
      apiUrl,
      authorization,
      brandId,
      clientKey,
      disableTransport,
      localStorage,
      transport,
      userId,
      userSignature,
    ]);

    useEffect(() => {
      if (!state.brand || !clientKey || !userId || !state.localStorage) {
        return;
      }

      state.localStorage.setItem(
        `${clientKey}/${userId}/provider`,
        JSON.stringify({
          brand: state.brand,
        })
      );
    }, [state.brand, clientKey, userId, state.localStorage]);

    useEffect(() => {
      if (!clientKey || !userId || disableTransport || !state.localStorage) {
        return;
      }

      const localStorageState = state.localStorage.getItem(
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
    }, [clientKey, userId, state.localStorage]);

    return (
      <CourierContext.Provider
        value={{
          ...state,
          ...actions,
          dispatch,
        }}
      >
        {children}
      </CourierContext.Provider>
    );
  };

if (typeof window !== "undefined") {
  (window as any).global = window;
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  window.Buffer = window.Buffer || require("buffer").Buffer;
}

import React, { useCallback, useEffect } from "react";
import createReducer from "react-use/lib/factory/createReducer";

import {
  Brand,
  ICourierContext,
  ICourierProviderProps,
  IMessage,
  WSOptions,
} from "./types";
import { CourierTransport } from "./transports/courier";
import {
  IActionBlock,
  ICourierEventMessage,
  ICourierMessage,
  IInboxMessagePreview,
  ITextBlock,
} from "./transports/types";
import reducer, { registerReducer as _registerReducer } from "./reducer";
import defaultMiddleware, {
  registerMiddleware as _registerMiddleware,
  Middleware,
} from "./middleware";
import useCourierActions from "./hooks/use-courier-actions";
import { usePageVisible } from "./hooks/use-page-visible";
import useTransport from "./hooks/use-transport";
import useClientSourceId from "./hooks/use-client-source-id";

export * from "./transports";
export * from "./hooks";

export const registerReducer = _registerReducer;
export const registerMiddleware = _registerMiddleware;

export type {
  Brand,
  IActionBlock,
  ICourierContext,
  ICourierEventMessage,
  ICourierMessage,
  IInboxMessagePreview,
  IMessage,
  ITextBlock,
  Middleware,
  WSOptions,
};

export const CourierContext =
  React.createContext<ICourierContext | undefined>(undefined);

export const CourierProvider: React.FunctionComponent<ICourierProviderProps> =
  ({
    id,
    apiUrl,
    authorization,
    brand,
    brandId,
    children,
    clientKey,
    localStorage = typeof window !== "undefined"
      ? window?.localStorage
      : undefined,
    middleware: _middleware = [],
    onMessage,
    transport: _transport,
    userId,
    userSignature,
    wsOptions,
  }) => {
    const clientSourceId = useClientSourceId({
      authorization,
      clientKey,
      id,
      localStorage,
      userId,
    });

    const middleware = [..._middleware, ...defaultMiddleware];
    const useReducer = useCallback(
      createReducer<any, Partial<ICourierContext>>(...middleware),
      [_middleware]
    );

    const transport =
      typeof window === "undefined"
        ? undefined
        : useTransport({
            authorization,
            clientSourceId,
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
      clientSourceId,
      clientKey,
      localStorage,
      middleware,
      transport,
      userId,
      userSignature,
    });

    const actions = useCourierActions(state, dispatch);

    usePageVisible((isVisible) => {
      if (!isVisible) {
        return;
      }

      // this means we left the tab and came back so we should refetch
      actions.pageVisible();
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
      courierTransport.onReconnection({
        id: "handleWSReconnection",
        callback: () => {
          actions.wsReconnected();
        },
      });

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

      let parsedLocalStorageState;
      if (state.localStorage) {
        const localStorageState = state.localStorage.getItem(
          `${clientKey}/${userId}/provider`
        );

        if (localStorageState) {
          try {
            parsedLocalStorageState = JSON.parse(localStorageState);
          } catch (ex) {
            console.log("error", ex);
          }
        }
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
        ...parsedLocalStorageState,
      });
    }, [
      actions,
      apiUrl,
      authorization,
      brandId,
      clientKey,
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

    return (
      <CourierContext.Provider
        value={{
          ...state,
          ...actions,
          clientSourceId,
          dispatch,
        }}
      >
        {children}
      </CourierContext.Provider>
    );
  };

if (typeof window !== "undefined") {
  (window as any).global = window;
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  window.Buffer = window.Buffer || require("buffer").Buffer;
}

import React, {
  useCallback,
  useEffect,
  useMemo,
  PropsWithChildren,
} from "react";
import createReducer from "react-use/lib/factory/createReducer";

import {
  Brand,
  EventType,
  ICourierContext,
  ICourierProviderProps,
  PinDetails,
  WSOptions,
  OnEvent,
} from "./types";
import { CourierTransport } from "./transports/courier";
import {
  IActionElemental,
  ICourierEventMessage,
  IInboxMessagePreview,
  ITextElemental,
  Interceptor,
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
export * from "./lib";

export const registerReducer = _registerReducer;
export const registerMiddleware = _registerMiddleware;

export type {
  Brand,
  IActionElemental,
  ICourierContext,
  ICourierEventMessage,
  IInboxMessagePreview,
  ITextElemental,
  Middleware,
  PinDetails,
  WSOptions,
  EventType,
  OnEvent,
  Interceptor,
};

export const CourierContext =
  React.createContext<ICourierContext | undefined>(undefined);

export const CourierProvider: React.FunctionComponent<
  PropsWithChildren<ICourierProviderProps>
> = ({
  tenantId,
  apiUrl,
  authorization,
  brand,
  brandId,
  children,
  clientKey,
  id,
  inboxApiUrl,
  localStorage = typeof window !== "undefined"
    ? window?.localStorage
    : undefined,
  middleware: _middleware = [],
  onMessage,
  onRouteChange,
  transport: _transport,
  userId,
  userSignature,
  wsOptions: _wsOptions = {},
}) => {
  const wsOptions = useMemo(
    () => _wsOptions,
    [
      _wsOptions.connectionTimeout,
      _wsOptions.onClose,
      _wsOptions.onError,
      _wsOptions.onReconnect,
      _wsOptions.url,
    ]
  );

  const clientSourceId = useClientSourceId({
    authorization,
    clientKey,
    id,
    localStorage,
    userId,
  });

  const middleware = [...defaultMiddleware, ..._middleware];
  const useReducer = useCallback(
    createReducer<any, Partial<ICourierContext>>(...middleware),
    [_middleware]
  );

  const transport =
    typeof window === "undefined"
      ? undefined
      : useTransport({
          tenantId: tenantId,
          authorization,
          clientSourceId,
          clientKey,
          transport: _transport,
          userSignature,
          wsOptions,
        });

  const [state, dispatch] = useReducer(reducer, {
    tenantId,
    apiUrl,
    authorization,
    brand,
    brandId,
    clientKey,
    clientSourceId,
    inboxApiUrl,
    localStorage,
    middleware,
    onRouteChange,
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

    const intervalId = setInterval(() => {
      courierTransport.keepAlive();
    }, 300000); // 5 minutes

    return () => {
      clearInterval(intervalId);
      courierTransport.unsubscribe(userId);
      courierTransport.closeConnection();
    };
  }, [tenantId, actions, transport, userId]);

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
      tenantId,
      apiUrl,
      authorization,
      brandId,
      clientKey,
      inboxApiUrl,
      localStorage,
      transport,
      userId,
      userSignature,
      ...parsedLocalStorageState,
    });
  }, [
    tenantId,
    actions,
    apiUrl,
    authorization,
    brandId,
    clientKey,
    inboxApiUrl,
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

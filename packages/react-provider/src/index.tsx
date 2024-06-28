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
  ICourierContext,
  ICourierProviderProps,
  OnEvent,
  ProviderTheme,
  ThemeVariables,
} from "./types";

import { CourierTransport } from "@trycourier/transport";
import { useTransport } from "@trycourier/react-hooks";

import reducer, { registerReducer as _registerReducer } from "./reducer";
import defaultMiddleware, {
  Middleware,
  registerMiddleware as _registerMiddleware,
} from "./middleware";
import useCourierActions from "./hooks/use-courier-actions";
import { usePageVisible } from "./hooks/use-page-visible";
import useClientSourceId from "./hooks/use-client-source-id";
import deepExtend from "deep-extend";
import { darkVariables, lightVariables } from "./theme";
import { createGlobalStyle } from "styled-components";
import { useIsOnline } from "./hooks/use-is-online";
import { useListenForTransportEvent } from "./hooks/use-listen-for-transport";

export * from "./hooks";

export const registerReducer = _registerReducer;
export const registerMiddleware = _registerMiddleware;

export type { Middleware, OnEvent, ProviderTheme, ICourierContext };

const GlobalThemeVariables = createGlobalStyle<{
  theme: {
    variables: ThemeVariables;
  };
}>(({ theme }) => {
  return {
    ":root": {
      "--ci-background": theme?.variables?.background,
      "--ci-text-color": theme?.variables?.textColor,
      "--ci-title-color": theme?.variables?.titleColor,
      "--ci-structure": theme?.variables?.structure,
      "--ci-icon": theme?.variables?.icon,
    },
  };
});

export const CourierContext =
  React.createContext<ICourierContext | undefined>(undefined);

const CourierProviderInner: React.FunctionComponent<
  PropsWithChildren<ICourierProviderProps>
> = ({
  apiUrl,
  authorization,
  brand,
  brandId,
  children,
  clientKey,
  id,
  tenantId,
  theme: _theme,
  inboxApiUrl,
  localStorage = typeof window !== "undefined"
    ? window?.localStorage
    : undefined,
  applyMiddleware,
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

  const middleware = useMemo(() => {
    if (!applyMiddleware) {
      return defaultMiddleware;
    }

    return applyMiddleware(defaultMiddleware);
  }, [applyMiddleware]);

  const useReducer = useCallback(
    createReducer<any, Partial<ICourierContext>>(...middleware),
    [middleware]
  );
  const isOnline = useIsOnline();

  const transport =
    typeof window === "undefined"
      ? undefined
      : useTransport({
          authorization,
          clientKey,
          clientSourceId,
          isOnline,
          tenantId: tenantId,
          transport: _transport,
          userSignature,
          wsOptions,
        });

  const theme = useMemo(
    () => ({
      ..._theme,
      variables: deepExtend(
        {},
        _theme?.colorMode === "dark" ? darkVariables : lightVariables,
        _theme?.variables ?? {}
      ),
    }),
    [_theme]
  );

  const [state, dispatch] = useReducer(reducer, {
    apiUrl,
    authorization,
    brand,
    brandId,
    clientKey,
    clientSourceId,
    inboxApiUrl,
    localStorage,
    onRouteChange,
    tenantId,
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
    const hasClientKeyAuth = clientKey && userId;
    const hasCustomTransport = Boolean(_transport);
    const hasJWTAuth = Boolean(authorization);

    if (!hasCustomTransport && !hasClientKeyAuth && !hasJWTAuth) {
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
          console.error(ex);
        }
      }
    }

    actions.init({
      apiUrl,
      authorization,
      brandId,
      clientKey,
      inboxApiUrl,
      localStorage,
      tenantId,
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
    inboxApiUrl,
    localStorage,
    tenantId,
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

  useListenForTransportEvent({
    transport,
    createTrackEvent: actions.createTrackEvent,
  });

  return (
    <CourierContext.Provider
      value={{
        ...state,
        ...actions,
        clientSourceId,
      }}
    >
      <GlobalThemeVariables theme={theme} />
      {children}
    </CourierContext.Provider>
  );
};

export const CourierProvider: React.FunctionComponent<
  PropsWithChildren<ICourierProviderProps>
> = (props) => {
  if (!props.clientKey && !props.authorization) {
    console.warn("Missing ClientKey or Authorization Token");
    return <>{props.children}</>;
  }

  return <CourierProviderInner {...props} />;
};

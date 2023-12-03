import React from "react";
import { render, unmountComponentAtNode } from "react-dom";

import {
  CourierProvider,
  WSOptions,
  Brand,
  Interceptor,
} from "@trycourier/react-provider";
import { CourierComponents } from "./components";
import { InboxProps } from "@trycourier/react-inbox";
import { ToastProps } from "@trycourier/react-toast";
import { UsePreferences } from "@trycourier/react-hooks";

const middleware = () => (next) => (action) => {
  const _action =
    window?.courier?.__actions?.[action.type.toLowerCase()] ??
    window?.courier?.__actions?.[action.type] ??
    [];

  for (const __a of _action) {
    __a(action);
  }

  if (window?.courier?.__actions?.["*"]) {
    for (const __a of window?.courier?.__actions?.["*"]) {
      __a(action);
    }
  }

  next(action);
};

declare global {
  interface Window {
    courier: {
      __actions: {
        [action: string]: Array<(payload: any) => void>;
      };
      toast?: {
        mergeConfig?: (config: ToastProps) => void;
        setConfig?: (config: ToastProps) => void;
        add?: (message: { title?: string; preview?: string }) => void;
      };
      inbox?: {
        mergeConfig?: (config: InboxProps) => void;
        setConfig?: (config: InboxProps) => void;
        config?: any;
      };
      preferences?: UsePreferences | {};
      transport?: any;
      brand?: Brand;
      renewSession?: (token: string) => void;
      init: (config: ICourierConfig) => void;
      on: (action: string, cb: () => void) => void;
    };
    courierAsyncInit?: () => void | Array<() => void>;
    courierConfig: ICourierConfig;
  }
}
interface ICourierConfig {
  tenantId?: string;
  apiUrl?: string;
  authorization?: string;
  brandId?: string;
  clientKey: string;
  enableMutationObserver?: boolean;
  inboxApiUrl?: string;
  onRouteChange?: (route: string) => void;
  onMessage?: Interceptor;
  components?: {
    inbox?: any;
    toast?: any;
    preferences?: any;
  };
  unsubscribePage?: {
    topicId: string;
    preferencePageUrl: string;
    list?: string;
  };
  initOnLoad?: boolean;
  userId?: string;
  userSignature?: string;
  wsOptions?: WSOptions;
  preferencePageDraftMode?: boolean;
}

const initCourier = (courierConfig?: ICourierConfig) => {
  const {
    tenantId,
    apiUrl,
    authorization,
    brandId,
    clientKey,
    inboxApiUrl,
    onMessage,
    onRouteChange,
    userId,
    userSignature,
    wsOptions,
  } = courierConfig ?? window.courierConfig ?? {};

  if (typeof document === "undefined") {
    return;
  }

  if (!userId || !clientKey) {
    return;
  }
  const existingCourierRoot =
    document.getElementsByTagName("courier-root")?.[0];

  if (existingCourierRoot) {
    unmountComponentAtNode(existingCourierRoot);
  } else {
    const courierRoot = document.createElement("courier-root");
    document.body.appendChild(courierRoot);
  }

  render(
    <CourierProvider
      tenantId={tenantId}
      apiUrl={apiUrl}
      authorization={authorization}
      brandId={brandId}
      clientKey={clientKey}
      inboxApiUrl={inboxApiUrl}
      onMessage={onMessage}
      onRouteChange={onRouteChange}
      userId={userId}
      userSignature={userSignature}
      wsOptions={wsOptions}
      middleware={[middleware]}
    >
      <CourierComponents />
    </CourierProvider>,
    document.getElementsByTagName("courier-root")?.[0]
  );
};

window.courier = {
  __actions: {},
  init: initCourier,
  on: (action: string, cb: () => void) => {
    window.courier.__actions[action] = window.courier.__actions[action] ?? [];
    window.courier.__actions[action].push(cb);
  },
};

if (window.courierConfig?.initOnLoad !== false) {
  initCourier();
}

if (typeof window.courierAsyncInit === "function") {
  window.courierAsyncInit();
}

if (Array.isArray(window.courierAsyncInit)) {
  for (const init of window.courierAsyncInit) {
    init();
  }

  window.courierAsyncInit = undefined;
}

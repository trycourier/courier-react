import React from "react";
import { render } from "react-dom";

import { CourierProvider, WSOptions, IBrand } from "@trycourier/react-provider";
import { CourierComponents } from "./components";
import { InboxProps } from "@trycourier/react-inbox";
import { ToastProps } from "@trycourier/react-toast";

declare global {
  interface Window {
    courier: {
      __actions: {
        [action: string]: Array<() => void>;
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
      transport?: any;
      brand?: IBrand;
      renewSession?: (token: string) => void;
      init: (config: ICourierConfig) => void;
      on: (action: string, cb: () => void) => void;
    };
    courierAsyncInit?: () => void | Array<() => void>;
    courierConfig: ICourierConfig;
  }
}
interface ICourierConfig {
  apiUrl?: string;
  authorization?: string;
  brandId?: string;
  clientKey: string;
  enableMutationObserver?: boolean;
  inboxApiUrl?: string;
  onRouteChange?: (route: string) => void;
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

let hasInit = false;

const initCourier = async (courierConfig?: ICourierConfig) => {
  const {
    apiUrl,
    authorization,
    brandId,
    clientKey,
    inboxApiUrl,
    onRouteChange,
    userId,
    userSignature,
    wsOptions,
  } = courierConfig ?? window.courierConfig ?? {};

  if (hasInit || typeof document === "undefined") {
    return;
  }

  if (!userId || !clientKey) {
    return;
  }

  const courierRoot = document.createElement("courier-root");
  document.body.appendChild(courierRoot);

  render(
    <CourierProvider
      apiUrl={apiUrl}
      authorization={authorization}
      brandId={brandId}
      clientKey={clientKey}
      inboxApiUrl={inboxApiUrl}
      onRouteChange={onRouteChange}
      userId={userId}
      userSignature={userSignature}
      wsOptions={wsOptions}
    >
      <CourierComponents />
    </CourierProvider>,
    courierRoot
  );

  hasInit = true;
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

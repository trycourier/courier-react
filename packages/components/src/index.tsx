import React from "react";
import { render } from "react-dom";

import { WSOptions } from "@trycourier/react-provider";
import { InboxProps } from "@trycourier/react-inbox";
import { ToastProps } from "@trycourier/react-toast";
import { App } from "./app";

declare global {
  interface Window {
    courier: {
      __actions: {
        [action: string]: Array<() => void>;
      };
      toast?: {
        mergeConfig?: (config: ToastProps) => void;
        setConfig?: (config: ToastProps) => void;
        add?: (message: { title: string; body: string }) => void;
      };
      inbox?: {
        mergeConfig?: (config: InboxProps) => void;
        setConfig?: (config: InboxProps) => void;
        config?: any;
      };
      transport?: any;
      init: (config: ICourierConfig) => void;
      on: (action: string, cb: () => void) => void;
    };
    courierAsyncInit?: () => void | Array<() => void>;
    courierConfig: ICourierConfig;
  }
}
interface ICourierConfig {
  apiUrl?: string;
  brandId?: string;
  clientKey: string;
  components?: {
    inbox?: any;
    toast?: any;
    preferences?: any;
  };
  initOnLoad?: boolean;
  userId?: string;
  userSignature?: string;
  wsOptions?: WSOptions;
  authorization?: string;
}

let hasInit = false;

const initCourier = async () => {
  if (hasInit || typeof document === "undefined") {
    return;
  }

  const courierRoot = document.createElement("courier-root");
  document.body.appendChild(courierRoot);

  render(<App />, courierRoot);

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

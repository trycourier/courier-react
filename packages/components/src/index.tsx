import React, { lazy, Suspense, useEffect } from "react";
import ReactDOM from "react-dom";
import { CourierProvider, useCourier } from "@trycourier/react-provider";
import { camelCase } from "camel-case";

const Toast = lazy(() => import("./components/Toast"));
const Inbox = lazy(() => import("./components/Inbox"));

interface ICourierConfig {
  initOnLoad?: boolean;
  apiUrl?: string;
  clientKey: string;
  userId?: string;
  userSignature?: string;
  wsUrl?: string;
  components?: {
    inbox?: any;
    toast?: any;
  };
}
declare global {
  interface Window {
    courier: {
      toast?: {
        add: (message: { title: string; body: string }) => void;
      };
      inbox?: {
        config: any;
      };
      transport?: any;
      init: (config: ICourierConfig) => void;
      on: (action: string, cb: () => void) => void;
    };
    courierAsyncInit?: () => void | Array<() => void>;
    courierConfig: ICourierConfig;
  }
}

const actions: {
  [action: string]: Array<() => void>;
} = {};

const CourierSdk: React.FunctionComponent<{
  activeComponents: {
    inbox: boolean;
    toast: boolean;
  };
}> = ({ activeComponents, children }) => {
  const courier = useCourier();

  if (!window.courier.transport) {
    window.courier.transport = courier.transport;
  }

  useEffect(() => {
    for (const component of Object.keys(activeComponents)) {
      const typedComponent = component as "inbox" | "toast";

      if (!courier[typedComponent] || window.courier[typedComponent]) {
        continue;
      }

      switch (typedComponent) {
        case "inbox": {
          window.courier.inbox = courier.inbox;
          break;
        }

        case "toast": {
          window.courier.toast = {
            add: courier.toast,
          };
          break;
        }
      }

      const initActions = actions[`${typedComponent}/init`] ?? [];
      for (const initAction of initActions) {
        initAction();
      }
    }
  }, [courier, activeComponents]);

  return <>{children}</>;
};

const getAttrsAsJson = (element?: Element) => {
  if (!element) {
    return;
  }

  return Array.from(element.attributes).reduce(
    (acc, curr) => {
      const attrName = camelCase(curr.name);

      if (!isNaN(Number(curr.value))) {
        acc[attrName] = Number(curr.value);
        return acc;
      }

      if (curr.value.toLowerCase() === "false") {
        acc[attrName] = false;
        return acc;
      }

      if (curr.value.toLowerCase() === "true") {
        acc[attrName] = true;
        return acc;
      }

      try {
        acc[attrName] = JSON.parse(curr.value);
        return acc;
      } catch {
        // do nothing
      }

      acc[attrName] = curr.value;
      return acc;
    },
    {} as {
      [key: string]: any;
    }
  );
};

const CourierComponents: React.FunctionComponent = () => {
  const componentConfigs = window.courierConfig?.components;
  const inboxElement = document.querySelector("courier-inbox") ?? undefined;

  const inboxConfig = {
    ...componentConfigs?.inbox,
    ...getAttrsAsJson(inboxElement),
  };

  const toastElement = document.querySelector("courier-toast") ?? undefined;
  const toastConfig = {
    ...componentConfigs?.toast,
    ...getAttrsAsJson(toastElement),
  };

  return (
    <CourierSdk
      activeComponents={{
        inbox: Boolean(inboxElement),
        toast: Boolean(toastElement),
      }}
    >
      {inboxElement &&
        ReactDOM.createPortal(
          <Suspense fallback={<div />}>
            <Inbox config={inboxConfig} />
          </Suspense>,
          inboxElement
        )}
      {toastElement &&
        ReactDOM.createPortal(
          <Suspense fallback={<div />}>
            <Toast config={toastConfig} />
          </Suspense>,
          toastElement
        )}
    </CourierSdk>
  );
};

let hasInit = false;

const initCourier = async (courierConfig?: ICourierConfig) => {
  const { clientKey, apiUrl, userId, userSignature, wsUrl } =
    courierConfig ?? window.courierConfig;

  if (hasInit || typeof document === "undefined") {
    return;
  }

  if (!userId || !clientKey) {
    return;
  }

  const courierRoot = document.createElement("courier-root");
  document.body.appendChild(courierRoot);

  ReactDOM.render(
    <CourierProvider
      apiUrl={apiUrl}
      clientKey={clientKey}
      userId={userId}
      userSignature={userSignature}
      wsUrl={wsUrl}
    >
      <CourierComponents />
    </CourierProvider>,
    courierRoot
  );

  hasInit = true;
};

window.courier = {
  init: initCourier,
  on: (action: string, cb: () => void) => {
    actions[action] = actions[action] ?? [];
    actions[action].push(cb);
  },
};

if (window.courierConfig.initOnLoad !== false) {
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

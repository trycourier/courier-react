import React, { lazy, Suspense, useEffect } from "react";
import ReactDOM from "react-dom";
import { CourierProvider, useCourier } from "@trycourier/react-provider";
import { camelCase } from "camel-case";

const Toast = lazy(() => import("./components/Toast"));
const Inbox = lazy(() => import("./components/Inbox"));

declare global {
  interface Window {
    courierSdk: {
      toast: any;
      inbox: any;
    };
    courierAsyncInit?: Array<() => void>;
    courierConfig: {
      apiUrl?: string;
      clientKey: string;
      userId?: string;
      userSignature?: string;
      wsUrl?: string;
      components?: {
        inbox?: any;
        toast?: any;
      };
    };
  }
}

const CourierSdk: React.FunctionComponent<{
  activeComponents: {
    inbox: boolean;
    toast: boolean;
  };
}> = ({ activeComponents, children }) => {
  const courier = useCourier();

  useEffect(() => {
    const courierSdk: any = {};

    for (const component of Object.keys(activeComponents)) {
      if (!courier[component]) {
        return;
      }

      courierSdk[component] = courier[component];
    }

    courierSdk.transport = courier.transport;
    window.courierSdk = courierSdk;
    if (!window.courierAsyncInit) {
      return;
    }

    for (const init of window.courierAsyncInit) {
      init();
    }

    window.courierAsyncInit = [];
  }, [courier]);

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

  console.log("toastConfig", toastConfig);

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

(async () => {
  const {
    clientKey,
    apiUrl,
    userId,
    userSignature,
    wsUrl,
  } = window.courierConfig;

  if (typeof document === "undefined") {
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
})();

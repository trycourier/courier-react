import React, { lazy, Suspense, useEffect } from "react";
import ReactDOM from "react-dom";
import { CourierProvider, useCourier } from "@trycourier/react-provider";

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

    window.courierAsyncInit = undefined;
  }, [courier]);

  return <>{children}</>;
};

const CourierComponents: React.FunctionComponent = () => {
  const inboxElement = document.querySelector("courier-inbox");
  const toastElement = document.querySelector("courier-toast");

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
            <Inbox />
          </Suspense>,
          inboxElement
        )}
      {toastElement &&
        ReactDOM.createPortal(
          <Suspense fallback={<div />}>
            <Toast />
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

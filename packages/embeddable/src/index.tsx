import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import root from "react-shadow";
import { CourierProvider } from "@trycourier/react-provider";

const Toast = lazy(() => import("./components/Toast"));
const Inbox = lazy(() => import("./components/Inbox"));

declare global {
  interface Window {
    courierConfig: {
      clientKey: string;
      apiUrl?: string;
      userId?: string;
      userSignature?: string;
    };
  }
}

const CourierComponents: React.FunctionComponent = () => {
  const elements = Array.from(document.querySelectorAll("courier"));

  return (
    <>
      {elements.map((element) => {
        const componentType = element.getAttribute("component");
        const Component = (() => {
          switch (componentType) {
            case "toast": {
              return Toast;
            }

            case "inbox": {
              return Inbox;
            }
          }
        })();

        if (!Component) {
          return null;
        }

        return ReactDOM.createPortal(
          <Suspense fallback={<div />}>
            <Component />
          </Suspense>,
          element
        );
      })}
    </>
  );
};

(async () => {
  const { clientKey, apiUrl, userId, userSignature } = window.courierConfig;

  if (typeof document === "undefined") {
    return;
  }

  const courierRoot = document.createElement("courier-root");
  document.body.appendChild(courierRoot);

  ReactDOM.render(
    <root.div>
      <CourierProvider
        apiUrl={apiUrl}
        clientKey={clientKey}
        userId={userId}
        userSignature={userSignature}
      >
        <CourierComponents />
      </CourierProvider>
    </root.div>,
    courierRoot
  );
})();

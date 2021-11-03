import { getAttrsAsJson } from "../lib/get-attrs-as-json";
import React, { useState, useEffect, Suspense, lazy } from "react";
import { createPortal } from "react-dom";
import { CourierSdk } from "./CourierSdk";

const Toast = lazy(() => import("./Toast"));
const Inbox = lazy(() => import("./Inbox"));

export const CourierComponents: React.FunctionComponent = () => {
  const componentConfigs = window.courierConfig?.components;
  const initialInbox = document.querySelector("courier-inbox");
  const [inboxElement, setInboxElement] = useState(initialInbox ?? undefined);

  const inboxConfig = {
    ...componentConfigs?.inbox,
    ...getAttrsAsJson(inboxElement),
  };

  const initialToast = document.querySelector("courier-toast");
  const [toastElement, setToastElement] = useState(initialToast ?? undefined);

  const toastConfig = {
    ...componentConfigs?.toast,
    ...getAttrsAsJson(toastElement),
  };

  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type !== "childList") {
          return;
        }

        mutation.addedNodes.forEach((component) => {
          const element = component as HTMLElement;
          const tagName = element?.tagName?.toLowerCase();

          switch (tagName) {
            case "courier-inbox":
              setInboxElement(element);
              return;

            case "courier-toast":
              setToastElement(element);
              return;

            default: {
              const childInbox = element.querySelector("courier-inbox");
              if (childInbox) {
                setInboxElement(childInbox);
              }
              const childToast = element.querySelector("courier-toast");
              if (childToast) {
                setToastElement(childToast);
              }
            }
          }
        });
      }
    });

    observer.observe(document.body, {
      attributes: false,
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [inboxElement, toastElement]);

  return (
    <CourierSdk
      activeComponents={{
        inbox: Boolean(inboxElement),
        toast: Boolean(toastElement),
      }}
    >
      {inboxElement &&
        createPortal(
          <Suspense fallback={<div />}>
            <Inbox {...inboxConfig} />
          </Suspense>,
          inboxElement
        )}
      {toastElement &&
        createPortal(
          <Suspense fallback={<div />}>
            <Toast config={toastConfig} />
          </Suspense>,
          toastElement
        )}
    </CourierSdk>
  );
};

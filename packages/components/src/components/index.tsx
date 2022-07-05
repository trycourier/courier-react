import { CourierSdk } from "./CourierSdk";
import { createPortal } from "react-dom";
import { getAttrsAsJson } from "../lib/get-attrs-as-json";
import deepExtend from "deep-extend";
import React, { useState, useEffect, Suspense, lazy } from "react";

const Toast = lazy(() => import("./Toast"));
const Inbox = lazy(() => import("./Inbox"));

const querySelector = (element: HTMLElement, selector: string) => {
  if (!element || !selector || !element.querySelector) {
    return;
  }

  return element.querySelector(selector);
};

export const CourierComponents: React.FunctionComponent = () => {
  const componentConfigs = window.courierConfig?.components;
  const initialInbox = querySelector(window?.document?.body, "courier-inbox");
  const [inboxElement, setInboxElement] = useState(initialInbox ?? undefined);

  const [inboxConfig, setInboxConfig] = useState({
    ...componentConfigs?.inbox,
    ...getAttrsAsJson(inboxElement),
  });

  const initialToast = querySelector(window?.document?.body, "courier-toast");
  const [toastElement, setToastElement] = useState(initialToast ?? undefined);

  const [toastConfig, setToastConfig] = useState({
    ...componentConfigs?.toast,
    ...getAttrsAsJson(toastElement),
  });

  useEffect(() => {
    if (inboxElement) {
      window.courier.inbox = {
        ...window.courier.inbox,
        setConfig: setInboxConfig,
        mergeConfig: (newConfig) =>
          setInboxConfig(deepExtend({}, inboxConfig, newConfig)),
      };
    }

    if (toastElement) {
      window.courier.toast = {
        ...window.courier.toast,
        mergeConfig: (newConfig) =>
          setToastConfig(deepExtend({}, toastConfig, newConfig)),
        setConfig: setToastConfig,
      };
    }
  }, [toastConfig, inboxConfig, inboxElement, toastElement]);

  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        switch (mutation.type) {
          case "attributes": {
            const element = mutation.target as Element;
            const attrs = getAttrsAsJson(mutation.target as Element);

            switch (element.tagName.toLowerCase()) {
              case "courier-inbox": {
                setInboxConfig(deepExtend({}, inboxConfig, attrs));
                return;
              }

              case "courier-toast": {
                setToastConfig(deepExtend({}, toastConfig, attrs));
                return;
              }
            }

            break;
          }

          case "childList": {
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
                  const childInbox = querySelector(element, "courier-inbox");
                  if (childInbox) {
                    setInboxElement(childInbox);
                  }
                  const childToast = querySelector(element, "courier-toast");
                  if (childToast) {
                    setToastElement(childToast);
                  }

                  return;
                }
              }
            });
          }
        }
      }
    });

    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [inboxConfig, toastConfig]);

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

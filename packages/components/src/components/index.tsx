import { CourierSdk } from "./CourierSdk";
import { createPortal } from "react-dom";
import { getAttrsAsJson } from "../lib/get-attrs-as-json";
import deepExtend from "deep-extend";
import React, { useState, useEffect, Suspense, lazy } from "react";

const Toast = lazy(() => import("./Toast"));
const Inbox = lazy(() => import("./Inbox"));
const Footer = lazy(() => import("./Footer"));
const Preferences = lazy(() => import("./Preferences"));

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

  const initialPreferences = querySelector(
    window?.document?.body,
    "courier-preferences"
  );
  const [preferencesElement, setPreferencesElement] = useState(
    initialPreferences ?? undefined
  );

  const initialFooter = querySelector(window?.document?.body, "courier-footer");
  const [preferenceFooter, setPreferenceFooter] = useState(
    initialFooter ?? undefined
  );

  const initialPreferencePage = querySelector(
    window?.document?.body,
    "courier-preference-page"
  );
  const [preferencePage, setPreferencePage] = useState(
    initialPreferencePage ?? undefined
  );

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

            switch (element.tagName.toLowerCase()) {
              case "courier-inbox": {
                const attrs = getAttrsAsJson(mutation.target as Element);
                setInboxConfig(deepExtend({}, inboxConfig, attrs));
                return;
              }

              case "courier-toast": {
                const attrs = getAttrsAsJson(mutation.target as Element);
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
                case "courier-preferences":
                  setPreferencesElement(element);
                  return;
                case "courier-footer":
                  setPreferenceFooter(element);
                  return;
                case "courier-preference-page":
                  setPreferencePage(element);
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
                  const childPreferences = querySelector(
                    element,
                    "courier-preferences"
                  );
                  if (childPreferences) {
                    setPreferencesElement(childPreferences);
                  }
                  const childFooter = querySelector(element, "courier-footer");
                  if (childFooter) {
                    setPreferenceFooter(childFooter);
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
        preferences: Boolean(preferencesElement),
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
      {preferencesElement &&
        createPortal(
          <Suspense fallback={<div />}>
            <Preferences />
          </Suspense>,
          preferencesElement
        )}
      {preferenceFooter &&
        createPortal(
          <Suspense fallback={<div />}>
            <Footer />
          </Suspense>,
          preferenceFooter
        )}
      {preferencePage &&
        createPortal(
          <Suspense fallback={<div />}>
            <>
              <Preferences />
              <Footer />
            </>
          </Suspense>,
          preferencePage
        )}
    </CourierSdk>
  );
};

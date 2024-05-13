import React, { useEffect } from "react";
import { useCourier } from "@trycourier/react-provider";
import { IInbox, useInbox, usePreferences } from "@trycourier/react-hooks";
import { ToastProps } from "@trycourier/react-toast";

export const CourierSdk: React.FunctionComponent<{
  activeComponents: {
    inbox: boolean;
    toast: boolean;
    preferences: boolean;
  };
}> = ({ children }) => {
  const courier =
    useCourier<{
      inbox: IInbox;
      toast: ToastProps;
    }>();
  const inbox = useInbox();
  const preferences = usePreferences();

  useEffect(() => {
    window.courier = window.courier ?? {};
    window.courier.inbox = window?.courier?.inbox ?? {};
    window.courier.inbox = {
      ...window.courier.inbox,
      ...inbox,
    };
  }, [inbox]);

  useEffect(() => {
    window.courier = window.courier ?? {};
    window.courier.preferences = window?.courier?.preferences ?? {};
    window.courier.preferences = {
      ...window.courier.preferences,
      ...preferences,
    };
  }, [preferences]);

  useEffect(() => {
    window.courier = window.courier ?? {};
    window.courier = {
      ...window.courier,
      toast: {
        ...window.courier.toast,
        ...courier.toast,
      },
      brand: courier.brand,
      identify: courier.identify,
      renewSession: courier.renewSession,
      subscribe: courier.subscribe,
      track: courier.track,
      transport: courier.transport,
      unsubscribe: courier.unsubscribe,
    };
  }, [courier]);

  return <>{children}</>;
};

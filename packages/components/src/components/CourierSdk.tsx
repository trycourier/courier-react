import React, { useEffect } from "react";
import { useCourier } from "@trycourier/react-provider";
import { useInbox, usePreferences } from "@trycourier/react-hooks";

export const CourierSdk: React.FunctionComponent<{
  activeComponents: {
    inbox: boolean;
    toast: boolean;
    preferences: boolean;
  };
}> = ({ children }) => {
  const courier = useCourier();
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
      transport: courier.transport,
      renewSession: courier.renewSession,
    };
  }, [courier]);

  return <>{children}</>;
};

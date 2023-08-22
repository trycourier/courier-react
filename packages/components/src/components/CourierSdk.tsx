import React, { useEffect, useRef } from "react";
import { useCourier } from "@trycourier/react-provider";
import { useInbox } from "@trycourier/react-hooks";

export const CourierSdk: React.FunctionComponent<{
  activeComponents: {
    inbox: boolean;
    toast: boolean;
    preferences: boolean;
  };
}> = ({ activeComponents, children }) => {
  const ref = useRef({
    inbox: false,
    toast: false,
    preferences: false,
  });

  const courier = useCourier();
  const inbox = useInbox();

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

  useEffect(() => {
    for (const component of Object.keys(activeComponents)) {
      const typedComponent = component as "inbox" | "toast";

      if (!courier[typedComponent] || ref.current[typedComponent]) {
        continue;
      }

      const initActions =
        window?.courier?.__actions?.[`${typedComponent}/init`] ?? [];
      for (const initAction of initActions) {
        initAction();
      }

      ref.current[typedComponent] = true;
    }
  }, [courier?.inbox, courier?.toast, activeComponents]);

  return <>{children}</>;
};

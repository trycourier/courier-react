import React, { useEffect } from "react";
import { useCourier } from "@trycourier/react-provider";
import { useInbox } from "@trycourier/react-hooks";

const didActionsInit = {
  inbox: false,
  toast: false,
  preferences: false,
};

export const CourierSdk: React.FunctionComponent<{
  activeComponents: {
    inbox: boolean;
    toast: boolean;
    preferences: boolean;
  };
}> = ({ activeComponents, children }) => {
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

      if (!courier[typedComponent] || didActionsInit[typedComponent]) {
        continue;
      }

      const initActions =
        window?.courier?.__actions?.[`${typedComponent}/init`] ?? [];
      for (const initAction of initActions) {
        initAction();
      }

      didActionsInit[typedComponent] = true;
    }
  }, [courier?.inbox, courier?.toast, activeComponents]);

  return <>{children}</>;
};

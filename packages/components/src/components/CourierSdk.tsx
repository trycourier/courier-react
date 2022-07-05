import React, { useEffect } from "react";
import { useCourier } from "@trycourier/react-provider";

export const CourierSdk: React.FunctionComponent<{
  activeComponents: {
    inbox: boolean;
    toast: boolean;
  };
}> = ({ activeComponents, children }) => {
  const courier = useCourier();

  if (!window.courier.transport) {
    window.courier.transport = courier.transport;
  }

  useEffect(() => {
    for (const component of Object.keys(activeComponents)) {
      const typedComponent = component as "inbox" | "toast";

      if (!courier[typedComponent]) {
        continue;
      }

      const initActions =
        window.courier.__actions[`${typedComponent}/init`] ?? [];
      for (const initAction of initActions) {
        initAction();
      }
    }
  }, [courier?.inbox, courier?.toast, activeComponents]);

  return <>{children}</>;
};

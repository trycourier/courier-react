import React from "react";
import { CourierProvider, ICourierContext } from "@trycourier/react-provider";

import Toast from "~/components/Toast";
import { IToastConfig } from "./types";

export { Toast } from "~/components/Toast";
export { useToast } from "./hooks";

export const ToastProvider: React.FunctionComponent<
  ICourierContext & {
    config: IToastConfig;
  }
> = ({ children, transport, clientKey, config }) => {
  return (
    <CourierProvider clientKey={clientKey} transport={transport}>
      <Toast config={config} />
      {children}
    </CourierProvider>
  );
};

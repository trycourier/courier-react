import React, { useMemo } from "react";
import { CourierProvider, ICourierContext } from "@trycourier/react-provider";
import { ThemeProvider } from "styled-components";
import { IToastConfig } from "./types";
import { defaultConfig } from "./defaults";
import Toast from "./components/Toast";
import deepExtend from "deep-extend";

export { useToast } from "./hooks";
export { Toast };
export { ToastBody } from "./components";
export type ToastProps = IToastConfig;

export const ToastProvider: React.FunctionComponent<
  ICourierContext & {
    config?: IToastConfig;
  }
> = ({ children, transport, clientKey, config, userId }) => {
  config = useMemo(() => {
    return deepExtend({}, defaultConfig, config ?? {});
  }, [config]) as IToastConfig;

  return (
    <ThemeProvider theme={config.theme ?? {}}>
      <CourierProvider
        clientKey={clientKey}
        userId={userId}
        transport={transport}
      >
        <Toast {...config} />
        {children}
      </CourierProvider>
    </ThemeProvider>
  );
};

import React from "react";
import { CourierProvider, CourierContext } from "@trycourier/react-provider";
import { ThemeProvider } from "styled-components";
import { IToastConfig } from "./types";
import { mergeConfig } from "./lib";
import { defaultConfig } from "./defaults";

export { useToast } from "./hooks";
export { Toast } from "~/components/Toast";
export { ToastBody } from "~/components";

export const ToastProvider: React.FunctionComponent<
  CourierContext & {
    config?: IToastConfig;
  }
> = ({ children, transport, clientKey, config: _config }) => {
  const config = mergeConfig(defaultConfig, _config);
  return (
    <ThemeProvider theme={config.theme ?? {}}>
      <CourierProvider clientKey={clientKey} transport={transport}>
        <Toast config={config} />
        {children}
      </CourierProvider>
    </ThemeProvider>
  );
};

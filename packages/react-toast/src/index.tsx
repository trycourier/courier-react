import React from "react";
import { CourierProvider, ICourierContext } from "@trycourier/react-provider";
import { ThemeProvider } from "styled-components";
import { IToastConfig } from "./types";
import { mergeConfig } from "./lib";
import { defaultConfig } from "./defaults";
import Toast from "~/components/Toast";
export * from "~/components";
export { useToast } from "./hooks";

export const ToastProvider: React.FunctionComponent<
  ICourierContext & {
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

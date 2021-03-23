import React from "react";
import { CourierProvider, ICourierContext } from "@trycourier/react-provider";

import Toast from "~/components/Toast";
import { IToastConfig } from "./types";
import { ThemeProvider } from "styled-components";
import { mergeConfig } from "./lib";
import { defaultConfig } from "./defaults";

export { Toast } from "~/components/Toast";
export { useToast } from "./hooks";

export const ToastProvider: React.FunctionComponent<
  ICourierContext & {
    config?: IToastConfig;
  }
> = ({ children, transport, clientKey, config:_config }) => {
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


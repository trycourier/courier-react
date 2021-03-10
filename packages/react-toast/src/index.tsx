import React, { useMemo, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import toastCss from "react-toastify/dist/ReactToastify.css";

import { createGlobalStyle } from "styled-components";
import {
  CourierProvider,
  ICourierContext,
  useCourier,
} from "@trycourier/react-provider";

import { defaultConfig } from "./defaults";
import { ICourierToastMessage } from "./components/Toast/types";
import { IToastConfig } from "./types";
import { Toast } from "./components";
import { useListenForTransportEvent } from "./hooks";
import Body from "./components/Body";

export { useToast } from "./hooks";

const GlobalStyle = createGlobalStyle`${toastCss}`;

export const CourierToast: React.FunctionComponent<{
  config: IToastConfig;
}> = ({ config }) => {
  const { clientKey, setContext, transport } = useCourier();

  const toastConfig = useMemo(() => {
    return {
      ...defaultConfig,
      ...config,
    };
  }, [config]);

  const handleToast = useCallback(
    (message: ICourierToastMessage | string) => {
      message =
        typeof message === "string"
          ? ({
              body: message,
              icon: undefined,
            } as ICourierToastMessage)
          : message;

      toast(
        <Body {...message} icon={message.icon ?? toastConfig.defaultIcon} />,
        {
          role: toastConfig.role ?? "status",
        }
      );
    },
    [toastConfig]
  );

  useEffect(() => {
    if (!setContext) {
      return;
    }

    setContext({
      toast: handleToast,
      toastConfig,
    });
  }, [toastConfig, handleToast]);

  useListenForTransportEvent(clientKey, transport, handleToast);

  return (
    <>
      <GlobalStyle />
      <Toast config={toastConfig} />
    </>
  );
};

export const ToastProvider: React.FunctionComponent<
  ICourierContext & {
    config: IToastConfig;
  }
> = ({ children, transport, clientKey, config }) => {
  return (
    <CourierProvider clientKey={clientKey} transport={transport}>
      <CourierToast config={config} />
      {children}
    </CourierProvider>
  );
};

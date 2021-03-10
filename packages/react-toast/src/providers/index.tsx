import React from "react";
import { toast } from "react-toastify";
//@ts-ignore
import toastCss from "react-toastify/dist/ReactToastify.css";
import { createGlobalStyle } from "styled-components";
import Body from "../components/Body";
import { Toast } from "../components";
import { IToastMessage } from "../components/Toast/types";
import { defaultConfig } from "./defaults";
import { ToastProviderProps, IToastContext } from "./types";
import { throwOnNoTransport } from "./helpers";
import { useListenForTransportEvent } from "./hooks";

const GlobalStyle = createGlobalStyle`${toastCss}`;

export const ToastContext = React.createContext<IToastContext | undefined>(
  undefined
);

export const ToastProvider: React.FunctionComponent<ToastProviderProps> = ({
  children,
  clientKey,
  config: _config,
  transport,
}) => {
  throwOnNoTransport(transport);

  const config = {
    ...defaultConfig,
    ..._config,
  };

  const handleToast = (message: IToastMessage | string) => {
    let notification: IToastMessage =
      typeof message === "string"
        ? {
            body: message,
          }
        : message;

    toast(
      <Body {...notification} icon={notification.icon ?? config.defaultIcon} />,
      {
        role: config.role ?? "status",
      }
    );
  };

  useListenForTransportEvent(transport, clientKey, handleToast);
  return (
    <ToastContext.Provider
      value={{
        clientKey,
        config,
        toast: handleToast,
      }}
    >
      <GlobalStyle />
      <Toast />
      {children}
    </ToastContext.Provider>
  );
};

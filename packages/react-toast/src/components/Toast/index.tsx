import React, { useCallback, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import { toast } from "react-toastify";

import { useCourier, useActions } from "@trycourier/react-provider";

import { getTransition } from "../../lib";
import { ToastStyled } from "./styled";
import toastCss from "react-toastify/dist/ReactToastify.css";
import { ICourierToastMessage } from "~/components/Toast/types";
import { IToastConfig } from "~/types";
import { useListenForTransportEvent } from "~/hooks";
import Body from "~/components/Body";

const GlobalStyle = createGlobalStyle`${toastCss}`;

export const Toast: React.FunctionComponent<{
  config?: IToastConfig;
}> = ({ config }) => {
  const courierContext = useCourier();

  if (!courierContext) {
    throw new Error("Missing Courier Provider");
  }

  const { clientKey, transport } = courierContext;
  const courierActions = useActions();

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
        <Body {...message} icon={message.icon ?? config?.defaultIcon} />,
        {
          role: config?.role ?? "status",
        }
      );
    },
    [config]
  );

  useEffect(() => {
    if (!courierActions) {
      return;
    }

    courierActions.initToast({
      toast: handleToast,
      config,
    });
  }, [config, handleToast]);

  useListenForTransportEvent(clientKey, transport, handleToast);

  return (
    <>
      <GlobalStyle />
      <ToastStyled
        data-testid="crt-toast-container"
        closeButton={false}
        closeOnClick={false}
        {...config}
        transition={getTransition(config?.transition)}
      />
    </>
  );
};

export default Toast;

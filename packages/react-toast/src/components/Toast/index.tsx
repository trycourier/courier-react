import React, { useMemo, useCallback, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import { toast } from "react-toastify";

import { useCourier } from "@trycourier/react-provider";

import { getTransition } from "./helpers";
import { ToastStyled } from "./styled";
import toastCss from "react-toastify/dist/ReactToastify.css";

import { defaultConfig } from "~/defaults";
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

  const { clientKey, transport, dispatch } = courierContext;

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
    if (!dispatch) {
      return;
    }

    dispatch({
      type: "INIT_TOAST",
      payload: {
        toast: handleToast,
        toastConfig,
      },
    });
  }, [toastConfig, handleToast]);

  useListenForTransportEvent(clientKey, transport, handleToast);

  return (
    <>
      <GlobalStyle />
      <ToastStyled
        data-test-id="crt-toast-container"
        closeButton={false}
        closeOnClick={false}
        {...toastConfig}
        transition={getTransition(toastConfig?.transition)}
      />
    </>
  );
};

export default Toast;

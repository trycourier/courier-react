import React, { useCallback, useEffect } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { toast } from "react-toastify";

import { useCourier, registerReducer } from "@trycourier/react-provider";

import toastCss from "react-toastify/dist/ReactToastify.css";
import { getTransition } from "../../lib";
import { ToastStyled } from "./styled";
import reducer from "~/reducer";
import { ICourierToastMessage } from "~/components/Toast/types";
import { IToastConfig } from "~/types";
import { useListenForTransportEvent } from "~/hooks";
import Body from "~/components/Body";

const GlobalStyle = createGlobalStyle`${toastCss}`;

export const Toast: React.FunctionComponent<
  IToastConfig & {
    config?: IToastConfig;
  }
> = (props) => {
  const courierContext = useCourier();

  if (props.config) {
    console.warn(
      "Config as a props is DEPRECATED and WILL be removed in a future version"
    );
  }

  const config = props.config ?? props;

  if (!courierContext) {
    throw new Error("Missing Courier Provider");
  }

  const { clientKey, transport, dispatch, brand } = courierContext;

  const handleToast = useCallback(
    (message: ICourierToastMessage | string) => {
      message =
        typeof message === "string"
          ? ({
              body: message,
              icon: undefined,
            } as ICourierToastMessage)
          : message;

      toast(<Body {...message} icon={message?.icon ?? config?.defaultIcon} />, {
        role: config?.role ?? "status",
      });
    },
    [config]
  );

  useEffect(() => {
    registerReducer("toast", reducer);
  }, []);

  useEffect(() => {
    dispatch({
      type: "toast/INIT",
      payload: {
        config,
        toast: handleToast,
      },
    });
  }, [config, dispatch, handleToast]);

  useListenForTransportEvent(clientKey, transport, handleToast);

  return (
    <>
      <GlobalStyle />
      <ThemeProvider
        theme={{
          ...props.theme,
          brand: props.brand ?? brand,
        }}
      >
        <ToastStyled
          data-testid="crt-toast-container"
          closeButton={false}
          closeOnClick={false}
          {...config}
          transition={getTransition(config?.transition)}
        />
      </ThemeProvider>
    </>
  );
};

export default Toast;

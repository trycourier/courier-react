import React, { useCallback, useEffect } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { toast } from "react-toastify";

import {
  useCourier,
  registerReducer,
  ICourierMessage,
} from "@trycourier/react-provider";

import toastCss from "react-toastify/dist/ReactToastify.css";
import { getTransition } from "../../lib";
import { ToastStyled } from "./styled";
import reducer from "~/reducer";
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
  const config = props.config ?? props;

  if (!courierContext) {
    throw new Error("Missing Courier Provider");
  }

  const {
    clientKey,
    transport,
    dispatch,
    brand: courierBrand,
  } = courierContext;

  const brand = config?.brand ?? courierBrand;

  const handleToast = useCallback(
    (message: ICourierMessage | string) => {
      message =
        typeof message === "string"
          ? ({
              body: message,
              icon: undefined,
            } as ICourierMessage)
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

  const autoClose = config?.autoClose ?? brand?.inapp?.toast?.timerAutoClose;

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
          autoClose={autoClose ? Number(autoClose) : undefined}
          {...config}
          transition={getTransition(config?.transition)}
        />
      </ThemeProvider>
    </>
  );
};

export default Toast;

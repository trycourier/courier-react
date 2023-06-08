import React, { useCallback, useEffect, useMemo } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { toast } from "react-toastify";

import {
  useCourier,
  registerReducer,
  IInboxMessagePreview,
} from "@trycourier/react-provider";

import toastCss from "react-toastify/dist/ReactToastify.css";
import { getTransition } from "../../lib";
import { ToastStyled } from "./styled";
import reducer from "~/reducer";
import { IToastConfig } from "~/types";
import { useListenForTransportEvent } from "~/hooks";
import Body from "~/components/Body";
import deepExtend from "deep-extend";
import { themeDefaults } from "~/constants";
import { defaultConfig } from "~/defaults";

const GlobalStyle = createGlobalStyle`${toastCss}`;

export const Toast: React.FunctionComponent<
  IToastConfig & {
    config?: IToastConfig;
  }
> = (props) => {
  const courierContext = useCourier();

  if (!courierContext) {
    throw new Error("Missing Courier Provider");
  }

  const {
    clientKey,
    transport,
    dispatch,
    brand: courierBrand,
  } = courierContext;

  const brand = props?.brand ?? courierBrand;

  const theme = useMemo(() => {
    return {
      ...props.theme,
      brand: deepExtend({}, themeDefaults, brand),
    };
  }, [props.theme, brand]);

  const handleToast = useCallback(
    (message: IInboxMessagePreview | string) => {
      message =
        typeof message === "string"
          ? ({
              preview: message,
              icon: undefined,
            } as IInboxMessagePreview)
          : message;

      toast(
        <Body
          {...message}
          icon={
            typeof message?.icon === "string"
              ? message.icon
              : typeof props?.defaultIcon === "string"
              ? props.defaultIcon
              : undefined
          }
        />,
        {
          role: props?.role ?? "status",
        }
      );
    },
    [props]
  );

  useEffect(() => {
    registerReducer("toast", reducer);
  }, []);

  useEffect(() => {
    dispatch({
      type: "toast/INIT",
      payload: {
        config: deepExtend({}, defaultConfig, props),
        toast: handleToast,
      },
    });
  }, [props, dispatch, handleToast]);

  useListenForTransportEvent(clientKey, transport, handleToast);

  const autoClose = props?.autoClose ?? brand?.inapp?.toast?.timerAutoClose;

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <ToastStyled
          data-testid="crt-toast-container"
          closeButton={false}
          closeOnClick={false}
          autoClose={autoClose ? Number(autoClose) : undefined}
          {...props}
          transition={getTransition(props?.transition)}
        />
      </ThemeProvider>
    </>
  );
};

export default Toast;

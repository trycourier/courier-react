export { default as Toast } from "./Toast";
import React, { ReactElement, useMemo } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import toastCss from "react-toastify/dist/ReactToastify.css";
import { useCourier } from "@trycourier/react-provider";
import { Theme } from "../types";

import Body from "./Body";
import { toastStyles } from "./Toast/styled";
import deepExtend from "deep-extend";
import { themeDefaults } from "~/constants";
import { Brand, IInboxMessagePreview } from "@trycourier/core";

const Styled = styled.div(toastStyles);
const GlobalStyle = createGlobalStyle`${toastCss}`;

export const ToastBody: React.FunctionComponent<
  Partial<Omit<IInboxMessagePreview, "title" | "preview">> & {
    theme?: Theme;
    brand?: Brand;
    title?: IInboxMessagePreview["title"] | ReactElement;
    preview?: IInboxMessagePreview["preview"] | ReactElement;
  }
> = ({ theme, ...props }) => {
  const { brand: remoteBrand } = useCourier();
  props.brand = props.brand ?? remoteBrand;
  props.icon = props.icon ?? props?.brand?.inapp?.icons?.message;

  theme = useMemo(() => {
    return {
      ...theme,
      brand: deepExtend({}, themeDefaults, props.brand ?? {}),
    };
  }, [theme, props.brand]);

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Styled
          className="Toastify__toast-container"
          style={{
            position: "relative",
            zIndex: 1,
          }}
        >
          <div className="Toastify__toast Toastify__toast--default">
            <div className="Toastify__toast-body">
              <Body {...props} />
            </div>
            <div
              className="Toastify__progress-bar Toastify__progress-bar--animated Toastify__progress-bar--default"
              style={{
                animation: "none",

                // will want to tweak these after we get them inside studio
                //animationDuration: "5000ms",
                //animationPlayState: "running",
                //animationIterationCount: "infinite",
              }}
            />
          </div>
        </Styled>
      </ThemeProvider>
    </>
  );
};

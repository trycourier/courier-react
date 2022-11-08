export { default as Toast } from "./Toast";
import React, { ReactElement } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import toastCss from "react-toastify/dist/ReactToastify.css";
import { Brand, useCourier, ICourierMessage } from "@trycourier/react-provider";
import { Theme } from "../types";

import Body from "./Body";
import { toastStyles } from "./Toast/styled";

const Styled = styled.div(toastStyles);
const GlobalStyle = createGlobalStyle`${toastCss}`;

export const ToastBody: React.FunctionComponent<
  Omit<ICourierMessage, "title" | "body"> & {
    theme?: Theme;
    brand?: Brand;
    title?: ICourierMessage["title"] | ReactElement;
    body?: ICourierMessage["body"] | ReactElement;
  }
> = ({ theme, ...props }) => {
  const { brand: remoteBrand } = useCourier();

  props.brand = props.brand ?? remoteBrand;
  props.icon = props.icon ?? props?.brand?.inapp?.icons?.message;

  return (
    <>
      <GlobalStyle />
      <ThemeProvider
        theme={{
          ...theme,
          brand: props.brand,
        }}
      >
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

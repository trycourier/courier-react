export { default as Toast } from "./Toast";
import React from "react";
import styled from "styled-components";

import Body from "./Body";
import { toastStyles } from "./Toast/styled";
import { ICourierToastMessage } from "./Toast/types";

const Styled = styled.div(toastStyles);

export const ToastBody: React.FunctionComponent<ICourierToastMessage> = (
  props
) => {
  return (
    <Styled className="Toastify__toast-container">
      <div className="Toastify__toast Toastify__toast--default">
        <div className="Toastify__toast-body">
          <Body {...props} />
        </div>
        <div
          className="Toastify__progress-bar Toastify__progress-bar--animated Toastify__progress-bar--default"
          style={{
            animation: "none",
            //animationDuration: "5000ms",
            //animationPlayState: "running",
            //animationIterationCount: "infinite",
          }}
        />
      </div>
    </Styled>
  );
};

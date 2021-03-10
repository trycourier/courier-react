import React from "react";
import { getTransition } from "./helpers";
import { ToastStyled } from "./styled";
import { IToastConfig } from "../../types";

const Toast: React.FunctionComponent<{
  config: IToastConfig;
}> = ({ config }) => {
  const Transition = getTransition(config?.transition);

  return (
    <ToastStyled
      data-test-id="crt-toast-container"
      closeButton={false}
      closeOnClick={false}
      {...config}
      transition={Transition}
    />
  );
};

export default Toast;

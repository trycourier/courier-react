import React from "react";
import { getTransition } from "./helpers";
import { ToastStyled } from "./styled";
import { useToastConfig } from "../../hooks";

const Toast: React.FunctionComponent = () => {
  const { config } = useToastConfig();

  const Transition = getTransition(config.transition);
  return (
    <ToastStyled
      data-test-id="crt-toast-container"
      {...config}
      transition={Transition}
      closeButton={false}
      closeOnClick={false}
    />
  );
};

export default Toast;

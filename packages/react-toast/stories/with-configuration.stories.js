import React from "react";

import { CourierToast, ToastProvider, useToast } from "../src";
import { Button } from "./styled";
import WarningIcon from "./warning.svg";

export default {
  title: "Toast",
  component: CourierToast,
  argTypes: {
    position: {
      control: {
        type: "select",
        options: ["top-right", "top-left", "bottom-right", "bottom-left"],
      },
    },
    hideProgressBar: {
      control: {
        type: "radio",
        options: [true, false],
      },
    },
    transition: {
      control: {
        type: "select",
        options: ["slide", "zoom", "bounce"],
      },
    },
  },
  args: {
    position: "top-right",
    hideProgressBar: true,
    transition: "slide",
  },
};

export function WithConfiguration({ position, hideProgressBar, transition }) {
  const theme = {
    root: {},
  };
  const config = {
    position,
    hideProgressBar,
    transition,
    defaultIcon: WarningIcon,
    theme,
  };
  return (
    <ToastProvider config={config}>
      <WithConfigurationComponent />
    </ToastProvider>
  );
}

function WithConfigurationComponent() {
  const [toast] = useToast();

  const onClick = () => {
    alert("You clicked!");
  };

  const notification = {
    title: "Warning",
    body: "We’ve noticed an elevated number of errors from your Notifications.",
    // icon: WarningIcon,
    onClick,
  };

  return <Button onClick={() => toast(notification)}>Show Toast</Button>;
}

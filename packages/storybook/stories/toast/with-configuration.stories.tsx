import React from "react";
import { ToastProvider, useToast } from "@trycourier/react-toast";
import { Button } from "./styled";
import WarningIcon from "./warning.svg";

export default {
  title: "Toast/Provider Configuration",
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

export function CustomIcon({ position, hideProgressBar, transition }) {
  function ExampleComponent() {
    const [toast] = useToast();
    const notification = {
      title: "Warning",
      body:
        "We’ve noticed an elevated number of errors from your Notifications.",
    };
    return <Button onClick={() => toast(notification)}>Show Toast</Button>;
  }
  const config = {
    position,
    hideProgressBar,
    transition,
    defaultIcon: WarningIcon,
  };
  return (
    <ToastProvider clientKey="client-key" config={config}>
      <ExampleComponent />
    </ToastProvider>
  );
}

export function CustomTheme({ position, hideProgressBar, transition }) {
  function ExampleComponent() {
    const [toast] = useToast();
    const notification = {
      title: "Warning",
      body:
        "We’ve noticed an elevated number of errors from your Notifications.",
    };
    return <Button onClick={() => toast(notification)}>Show Toast</Button>;
  }
  const config = {
    position,
    hideProgressBar,
    transition,
    defaultIcon: WarningIcon,
    theme: {
      toast: {
        backgroundColor: "black",
      },
    },
  };
  return (
    <ToastProvider clientKey="client-key" config={config}>
      <ExampleComponent />
    </ToastProvider>
  );
}

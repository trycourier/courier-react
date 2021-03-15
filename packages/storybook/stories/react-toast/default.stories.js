import React from "react";

import { CourierToast, ToastProvider, useToast } from "@trycourier/react-toast";

import { Button } from "./styled";

export default {
  title: "Toast",
  component: CourierToast,
  args: {
    bodyText: "One API for notifications!",
  },
};

export function Default({ bodyText }) {
  function DefaultComponent({ body }) {
    const [toast] = useToast();
    return <Button onClick={() => toast(body)}>Show Toast</Button>;
  }

  return (
    <ToastProvider clientKey="client-key">
      <DefaultComponent body={bodyText} />
    </ToastProvider>
  );
}

export function NoIcon({ bodyText }) {
  function DefaultComponent({ body }) {
    const [toast] = useToast();
    return <Button onClick={() => toast(body)}>Show Toast</Button>;
  }

  return (
    <ToastProvider
      clientKey="client-key"
      config={{
        defaultIcon: false,
      }}
    >
      <DefaultComponent body={bodyText} />
    </ToastProvider>
  );
}

export function NoTimer({ bodyText }) {
  function DefaultComponent({ body }) {
    const [toast] = useToast();
    return <Button onClick={() => toast(body)}>Show Toast</Button>;
  }

  return (
    <ToastProvider
      clientKey="client-key"
      config={{
        autoClose: false,
      }}
    >
      <DefaultComponent body={bodyText} />
    </ToastProvider>
  );
}

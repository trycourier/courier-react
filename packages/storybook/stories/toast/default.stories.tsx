import React, { useEffect } from "react";

import { ToastProvider, useToast } from "@trycourier/react-toast";

import { Button } from "./styled";

export default {
  title: "Toast/Basic",
  args: {
    bodyText: "One API for notifications!",
  },
};

export function Default({ bodyText }) {
  function DefaultComponent({ body }) {
    const [toast] = useToast();
    useEffect(() => {
      toast(body);
    }, [toast]);
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

export function NoAutoClose({ bodyText }) {
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

export function WithClickAction({ bodyText }) {
  function DefaultComponent({ body }) {
    const notification = {
      title: "Courier",
      body,
      data: {
        clickAction: "https://app.courier.com",
        clickedUrl: "https://example.com/e/clicked",
        readUrl: "https://example.com/e/read",
      },
      options: {
        hideProgressBar: false,
      },
    };
    const [toast] = useToast();
    return <Button onClick={() => toast(notification)}>Show Toast</Button>;
  }

  return (
    <ToastProvider clientKey="client-key">
      <DefaultComponent body={bodyText} />
    </ToastProvider>
  );
}

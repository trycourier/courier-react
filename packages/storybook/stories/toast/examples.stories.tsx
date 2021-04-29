import React from "react";
import {
  ToastProvider,
  Toast,
  useToast,
  ToastBody,
} from "@trycourier/react-toast";
import { CourierProvider } from "@trycourier/react-provider";

import { Button } from "./styled";

export default {
  title: "Toast/Examples",
  args: {
    bodyText: "One API for notifications!",
  },
};

export function Default({ bodyText }) {
  return (
    <ToastProvider clientKey="client-key">
      <ToastBody body={bodyText} title="Title" />
    </ToastProvider>
  );
}

export function WithCourierProvider({ bodyText }) {
  function DefaultComponent() {
    const [toast] = useToast();
    return <Button onClick={() => toast("Hello World")}>Show Toast</Button>;
  }

  return (
    <CourierProvider clientKey="client-key" userId="user-id">
      <Toast
        brand={{
          inapp: {
            colors: {
              invertButtons: true,
            },
          },
          colors: {
            primary: "red",
            secondary: "green",
          },
        }}
      />
      <DefaultComponent />
    </CourierProvider>
  );
}

export function NoIcon({ bodyText }) {
  function DefaultComponent({ body }) {
    const [toast] = useToast();
    return (
      <Button onClick={() => toast({ body, title: "Title" })}>
        Show Toast
      </Button>
    );
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
    return (
      <Button onClick={() => toast({ body, title: "Title" })}>
        Show Toast
      </Button>
    );
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

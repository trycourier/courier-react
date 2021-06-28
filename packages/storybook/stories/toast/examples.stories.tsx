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
    <CourierProvider>
      <ToastBody
        body={bodyText}
        title="Title"
        brand={{
          inapp: {
            colors: {
              invertButtons: true,
            },
            disableMessageIcon: true,
            icons: {
              message:
                "https://d33wubrfki0l68.cloudfront.net/ca2747f11cc64d0e424e27b4a804b9d981b22453/9ab46/_next/static/images/logo@2x-5d5af82635bfdd3ad24e54f9eb364097.png",
            },
          },
          colors: {
            primary: "red",
            secondary: "green",
          },
        }}
      />
    </CourierProvider>
  );
}

export function CustomTitleAndBody() {
  const handleOnClick = () => {
    console.log("click");
  };
  return (
    <CourierProvider>
      <ToastBody
        onClick={handleOnClick}
        body={<h3>Hello World</h3>}
        title={<h1>Title</h1>}
        brand={{
          inapp: {
            colors: {
              invertButtons: true,
            },

            icons: {
              message:
                "https://d33wubrfki0l68.cloudfront.net/ca2747f11cc64d0e424e27b4a804b9d981b22453/9ab46/_next/static/images/logo@2x-5d5af82635bfdd3ad24e54f9eb364097.png",
            },
          },
          colors: {
            primary: "red",
            secondary: "green",
          },
        }}
      />
    </CourierProvider>
  );
}

export function WithBlocks() {
  return (
    <CourierProvider>
      <ToastBody
        blocks={[
          {
            type: "text",
            text: "Hello World",
          },
          {
            type: "action",
            text: "View Details",
            url: "https://www.courier.com",
          },
        ]}
        title="This is a really long title lalalalalala"
      />
    </CourierProvider>
  );
}

export function MultiLineMessage() {
  return (
    <CourierProvider>
      <ToastBody
        body="This is a really long message lalalalalalalalalalalala lalalalalala"
        title="This is a really long title lalalalalala lalalalalala lalalalalala"
      />
    </CourierProvider>
  );
}

export function WithCourierProvider({ bodyText }) {
  function DefaultComponent() {
    const [toast] = useToast();
    return <Button onClick={() => toast("Hello World")}>Show Toast</Button>;
  }

  return (
    <CourierProvider>
      <Toast
        brand={{
          inapp: {
            colors: {
              invertButtons: true,
            },
            icons: {
              message:
                "https://d33wubrfki0l68.cloudfront.net/ca2747f11cc64d0e424e27b4a804b9d981b22453/9ab46/_next/static/images/logo@2x-5d5af82635bfdd3ad24e54f9eb364097.png",
            },
            toast: {
              timerAutoClose: "0",
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
    <ToastProvider>
      <DefaultComponent body={bodyText} />
    </ToastProvider>
  );
}

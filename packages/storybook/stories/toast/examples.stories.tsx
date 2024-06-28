import React from "react";
import { Toast, useToast, ToastBody } from "@trycourier/react-toast";
import { CourierProvider } from "@trycourier/react-provider";

import { Button } from "./styled";

export default {
  title: "Toast/Examples",
  args: {
    bodyText: "One API for notifications!",
  },
};

export function Default({
  bodyText,
}: {
  bodyText: string;
}): React.ReactElement {
  return (
    <CourierProvider clientKey="abc" userId="123">
      <ToastBody
        message={{} as any}
        preview={bodyText}
        title="Title"
        brand={{
          inapp: {
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

export function CustomTitleAndBody(): React.ReactElement {
  return (
    <CourierProvider clientKey="abc" userId="123">
      <ToastBody
        message={{} as any}
        preview={<h3>Hello World</h3>}
        title={<h1>Title</h1>}
        brand={{
          inapp: {
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

export function WithAction(): React.ReactElement {
  return (
    <CourierProvider clientKey="abc" userId="123">
      <ToastBody
        message={
          {
            actions: [
              {
                type: "action",
                content: "View Details",
                href: "https://www.courier.com",
              },
            ],
          } as any
        }
        preview="hello world"
        title="This is a really long title lalalalalala"
      />
    </CourierProvider>
  );
}

export function WithMultipleAction(): React.ReactElement {
  return (
    <CourierProvider clientKey="abc" userId="123">
      <ToastBody
        message={
          {
            actions: [
              {
                type: "action",
                content: "Approve",
                href: "https://www.courier.com",
              },
              {
                type: "action",
                content: "Deny",
                href: "https://www.courier.com",
              },
            ],
          } as any
        }
        preview="hello world"
        title="This is a really long title lalalalalala"
      />
    </CourierProvider>
  );
}

export function MultiLineMessage(): React.ReactElement {
  return (
    <CourierProvider clientKey="abc" userId="123">
      <ToastBody
        message={{} as any}
        preview="This is a really long message lalalalalalalalalalalala lalalalalala"
        title="This is a really long title lalalalalala lalalalalala lalalalalala"
      />
    </CourierProvider>
  );
}

export function WithCourierProvider(): React.ReactElement {
  function DefaultComponent() {
    const [toast] = useToast();
    return <Button onClick={() => toast("Hello World")}>Show Toast</Button>;
  }

  return (
    <CourierProvider clientKey="abc" userId="123">
      <Toast
        brand={{
          inapp: {
            icons: {
              message:
                "https://d33wubrfki0l68.cloudfront.net/ca2747f11cc64d0e424e27b4a804b9d981b22453/9ab46/_next/static/images/logo@2x-5d5af82635bfdd3ad24e54f9eb364097.png",
            },
            toast: {
              timerAutoClose: 0,
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

export function NoIcon({ bodyText }: { bodyText: string }): React.ReactElement {
  function DefaultComponent({ body }: { body: string }) {
    const [toast] = useToast();
    return (
      <Button onClick={() => toast({ preview: body, title: "Title" })}>
        Show Toast
      </Button>
    );
  }

  return (
    <CourierProvider clientKey="abc" userId="123">
      <Toast defaultIcon={false} />
      <DefaultComponent body={bodyText} />
    </CourierProvider>
  );
}

export function NoAutoClose({
  bodyText,
}: {
  bodyText: string;
}): React.ReactElement {
  function DefaultComponent({ body }: { body: string }) {
    const [toast] = useToast();
    return (
      <Button onClick={() => toast({ preview: body, title: "Title" })}>
        Show Toast
      </Button>
    );
  }

  return (
    <CourierProvider clientKey="abc" userId="123">
      <Toast autoClose={false} />
      <DefaultComponent body={bodyText} />
    </CourierProvider>
  );
}

export function WithClickAction({
  bodyText,
}: {
  bodyText: string;
}): React.ReactElement {
  function DefaultComponent({ body }: { body: string }) {
    const notification = {
      title: "Courier",
      preview: body,
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
    <CourierProvider clientKey="abc" userId="123">
      <Toast />
      <DefaultComponent body={bodyText} />
    </CourierProvider>
  );
}

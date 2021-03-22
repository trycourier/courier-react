import React from "react";

import { CourierToast, ToastProvider, useToast } from "@trycourier/react-toast";
import { Button } from "./styled";

export default {
  title: "Toast/Toast",
  component: CourierToast,
  args: {
    bodyText: "One API for notifications!",
  },
};
/** With Click Action */
export function ClickAction({ bodyText }) {
  return (
    <ToastProvider clientKey="client-key">
      <DefaultComponentWithAction body={bodyText} />
    </ToastProvider>
  );
}

function DefaultComponentWithAction({ body }) {
  const [toast] = useToast();

  const notification = {
    title: "Courier",
    body,
    data: {
      clickAction: "https://app.courier.com",
      clickedUrl: "https://example.com/e/clicked",
      readUrl: "https://example.com/e/read"
    },
    options: {
      hideProgressBar: false,
    },
  };
  return <Button onClick={() => toast(notification)}>Show Toast</Button>;
}

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
      clickedUrl: "https://api.courier.com/something/send",
    },
    options: {
      hideProgressBar: false,
    },
  };
  return <Button onClick={() => toast(notification)}>Show Toast</Button>;
}

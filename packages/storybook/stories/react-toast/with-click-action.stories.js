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
      // clickAction: "https://app.courier.com",
      clickedUrl: "https://a4imqw2244.execute-api.us-east-1.amazonaws.com/dev/e/f1p29xnsjq496hpgmsan0cjxzppk",
      readUrl: "https://a4imqw2244.execute-api.us-east-1.amazonaws.com/dev/e/68wwg427xp4mfgha7nc9mmw5tfkw"
    },
    options: {
      hideProgressBar: false,
    },
  };
  return <Button onClick={() => toast(notification)}>Show Toast</Button>;
}

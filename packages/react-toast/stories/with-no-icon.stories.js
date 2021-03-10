import React from "react";

import { Toast, ToastProvider, useToast } from "../src";
import { Button } from "./styled";

export default {
  title: "Toast",
  component: Toast,
  args: {
    bodyText: "One API for notifications!",
  },
};

function DefaultComponent({ body }) {
  const [toast] = useToast();
  return <Button onClick={() => toast(body)}>Show Toast</Button>;
}

export function NoIcon({ bodyText }) {
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

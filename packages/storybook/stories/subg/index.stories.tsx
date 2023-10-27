import React from "react";
import SinceYouBeenGone from "@trycourier/react-subg";
import { Inbox } from "@trycourier/react-inbox";
import { Toast } from "@trycourier/react-toast";

import { CourierProvider } from "@trycourier/react-provider";

export default {
  title: "SinceYouBeenGone",
};

export const Example = () => {
  return (
    <CourierProvider
      wsOptions={{
        url: process.env.WS_URL,
      }}
      apiUrl={process.env.API_URL}
      inboxApiUrl={process.env.INBOX_API_URL}
      clientKey={process.env.CLIENT_KEY}
      userId={process.env.USER_ID}
    >
      <Inbox />
      <Toast />
      <SinceYouBeenGone />
    </CourierProvider>
  );
};

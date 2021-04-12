import React, { useEffect } from "react";

import { Inbox } from "@trycourier/react-inbox";
import { Toast } from "@trycourier/react-toast";
import { CourierProvider, CourierTransport } from "@trycourier/react-provider";

export default {
  title: "Inbox/With Toast",
  argTypes: {},
  args: {},
};

const clientKey = process.env.CLIENT_KEY || "";
const userId = process.env.USER_ID || "";
const channel = "TEST_EVENT";

let courierTransport: CourierTransport;

if (typeof window !== "undefined") {
  courierTransport = new CourierTransport({
    wsUrl: process.env.WS_URL,
    clientKey,
  });
}

export function Default() {
  useEffect(() => {
    courierTransport?.subscribe(userId, channel);

    return () => {
      courierTransport?.unsubscribe(userId, channel);
    };
  }, []);

  const handleNotify = () => {
    courierTransport.send({
      action: "notify",
      data: {
        channel: userId,
        event: channel,
        message: {
          title: "Success!",
          body: "We sent a toast with a websocket",
        },
      },
    });
  };

  return (
    <>
      <CourierProvider
        clientKey={clientKey}
        userId={userId}
        transport={courierTransport}
        brandId="S0E8PFMXC44SSFG6J8A7EF4QXRNX"
      >
        <Toast />
        <Inbox title="Inbox" />
      </CourierProvider>
      <button onClick={handleNotify}>Test</button>
    </>
  );
}

export function WithTheme() {
  return (
    <>
      <CourierProvider
        clientKey={clientKey}
        userId={userId}
        transport={courierTransport}
        brand={{
          primaryColor: "red",
        }}
      >
        <Toast />
        <Inbox title="Inbox" />
      </CourierProvider>
    </>
  );
}

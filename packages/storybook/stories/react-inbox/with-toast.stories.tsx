import React, { useEffect } from "react";
import { Inbox } from "@trycourier/react-inbox";
import { Toast } from "@trycourier/react-toast";
import { CourierProvider, CourierTransport } from "@trycourier/react-provider";

export default {
  title: "Inbox/With Toast",
  component: Inbox,
  argTypes: {},
  args: {},
};

const clientKey = "YjAzNzA0NGMtYTQ5Yi00YzYzLTk1ZjUtNzg1Yzk5NjA0ZTQy";
const userId = "f9e9603f-9179-4c56-b3d2-2ee4b890e08b";
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
      >
        <Toast />
        <Inbox title="Inbox" />
      </CourierProvider>
      <button onClick={handleNotify}>Test</button>
    </>
  );
}

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

const clientKey = "ZDRiMTViNmMtODdmZi00OWMzLWI5YTgtYmU5NTc3YTRlM2Y1";
const userId = "3b17362c-0c91-4fcd-a829-885a2343eb67";
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
        <Inbox title="Notifications" />
      </CourierProvider>
      <button onClick={handleNotify}>Test</button>
    </>
  );
}

import React, { useEffect, useState } from "react";

import { Inbox } from "@trycourier/react-inbox";
import { Toast } from "@trycourier/react-toast";
import { CourierProvider, CourierTransport } from "@trycourier/react-provider";

export default {
  title: "Inbox/With Toast",
  argTypes: {},
  args: {},
};

const API_URL = process.env.API_URL || "";
const clientKey = process.env.CLIENT_KEY || "";
const USER_ID = process.env.USER_ID || "";
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
    courierTransport?.subscribe(USER_ID, channel);

    return () => {
      courierTransport?.unsubscribe(USER_ID, channel);
    };
  }, []);

  const handleNotify = () => {
    courierTransport.send({
      action: "notify",
      data: {
        channel: USER_ID,
        event: channel,
        message: {
          title: "Success!",
          body: "We sent a toast with a websocket",
        },
      },
    });
  };

  return (
    <CourierProvider
      apiUrl={API_URL}
      clientKey={clientKey}
      wsUrl={process.env.WS_URL}
      userId={USER_ID}
    >
      <div style={{ display: "flex" }}>
        <Toast />
        <Inbox
          title="Inbox"
          brand={{
            inapp: {
              disableMessageIcon: true,
            },
          }}
        />
        <button onClick={handleNotify}>Test</button>
      </div>
    </CourierProvider>
  );
}

export function AsyncUserId() {
  const [userId, setUserId] = useState("");
  useEffect(() => {
    courierTransport?.subscribe(userId, channel);

    return () => {
      courierTransport?.unsubscribe(userId, channel);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setUserId(USER_ID);
    }, 3000);
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
      <CourierProvider apiUrl={API_URL} clientKey={clientKey} userId={userId}>
        <Toast />
        <Inbox title="Inbox" />
      </CourierProvider>
      <button onClick={handleNotify}>Test</button>
    </>
  );
}

export function OnMessage() {
  const handleOnMessage = (message) => {
    console.log(message);
    return message;
  };

  return (
    <CourierProvider
      apiUrl={API_URL}
      wsUrl={process.env.WS_URL}
      clientKey={clientKey}
      userId={USER_ID}
      onMessage={handleOnMessage}
    >
      <Toast />
      <Inbox title="Inbox" />
    </CourierProvider>
  );
}

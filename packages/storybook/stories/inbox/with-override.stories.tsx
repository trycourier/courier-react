import React, { useEffect } from "react";

import { Inbox } from "@trycourier/react-inbox";
import { Toast } from "@trycourier/react-toast";
import { CourierProvider, CourierTransport } from "@trycourier/react-provider";

export default {
  title: "Inbox/With Override",
  argTypes: {},
  args: {},
};

const API_URL = process.env.API_URL || "";
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

  const middleware = () => (next) => (action) => {
    if (action.type === "inbox/INIT") {
      next({
        ...action,
        payload: {
          ...action.payload,
          unreadMessageCount: 1,
        },
      });
      return;
    }
    if (action.type === "inbox/SET_UNREAD_MESSAGE_COUNT") {
      next({
        type: action.type + "/DONE",
        payload: 1,
      });
      return;
    }
    if (action.type === "inbox/FETCH_MESSAGES") {
      next({
        type: action.type + "/DONE",
        payload: {
          appendMessages: false,
          messages: [
            {
              created: "2021-04-06T18:02:28.065Z",
              read: true,
              content: {
                title: "Template Published",
                body: "Click here for more details!sdf",
                data: {
                  clickAction:
                    "/designer/notifications/3W4FVA58RC4M84P4EH2FMQH39N2V",
                  triggeredBy: "f9e9603f-9179-4c56-b3d2-2ee4b890e08b",
                },
              },
            },
          ],
        },
      });
      return;
    }
    next(action);
  };

  return (
    <>
      <CourierProvider
        apiUrl={API_URL}
        clientKey={clientKey}
        userId={userId}
        transport={courierTransport}
        brandId={process.env.BRAND_ID || ""}
        middleware={[middleware]}
      >
        <Toast />
        <Inbox title="Inbox" />
      </CourierProvider>
      <button onClick={handleNotify}>Test</button>
    </>
  );
}

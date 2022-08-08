import React, { useEffect } from "react";

import { Inbox, useInbox } from "@trycourier/react-inbox";
import { Toast } from "@trycourier/react-toast";
import { CourierProvider } from "@trycourier/react-provider";
import {
  withKnobs,
  text,
  boolean,
  color,
  select,
} from "@storybook/addon-knobs";

export default {
  title: "Inbox/Examples",
  decorators: [withKnobs],
};

const API_URL = process.env.API_URL || "";
const CLIENT_KEY = process.env.CLIENT_KEY || "";
const USER_ID = process.env.USER_ID || "";

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

  if (action.type === "inbox/FETCH_UNREAD_MESSAGE_COUNT") {
    next({
      type: action.type + "/DONE",
      payload: 1,
    });
    return;
  }

  if (action.type === "inbox/FETCH_MESSAGES") {
    if (action.meta.isRead === false) {
      next({
        type: action.type + "/DONE",
        payload: {
          appendMessages: false,
          messages: [],
        },
      });
      return;
    }

    next({
      type: action.type + "/DONE",
      payload: {
        appendMessages: false,
        messages: [
          {
            messageId: 123,
            created: "2021-04-06T18:02:28.065Z",
            read: false,
            content: {
              title: "Unread Message",
              body: "This Message is Unread",
              data: {
                clickAction:
                  "/designer/notifications/3W4FVA58RC4M84P4EH2FMQH39N2V",
                triggeredBy: "f9e9603f-9179-4c56-b3d2-2ee4b890e08b",
              },
            },
          },
          {
            messageId: 456,
            created: "2021-04-06T18:02:28.065Z",
            read: true,
            content: {
              title: "Read Message",
              body: "This Message is Read",
              data: {
                clickAction:
                  "/designer/notifications/3W4FVA58RC4M84P4EH2FMQH39N2V",
                triggeredBy: "f9e9603f-9179-4c56-b3d2-2ee4b890e08b",
              },
            },
          },
          {
            messageId: 456,
            created: "2021-04-06T18:02:28.065Z",
            read: true,
            content: {
              title: "Read Message",
              blocks: [
                {
                  type: "text",
                  text: "Hello World",
                },
                {
                  type: "action",
                  text: "View Details",
                  url: "https://www.courier.com",
                },
              ],
            },
          },
        ],
      },
    });
    return;
  }
  next(action);
};

const UseInbox = () => {
  const inbox = useInbox();

  useEffect(() => {
    if (!inbox.isOpen) {
      inbox.toggleInbox();
    }
  }, [inbox.isOpen]);

  return null;
};

export function Branded(): React.ReactElement {
  return (
    <CourierProvider
      clientKey={CLIENT_KEY}
      userId={USER_ID}
      middleware={[middleware]}
      brand={{
        colors: {
          primary: color("Primary", "green"),
          secondary: color("Secondary", "orange"),
          tertiary: color("Tertiary", "red"),
        },
        inapp: {
          disableCourierFooter: boolean("Disable Footer", true),
          borderRadius: text("Border Radius", "24px"),
          disableMessageIcon: boolean("Disable Message Icon", false),
          placement: select("Placement", ["bottom", "left", "right"], "right"),
          emptyState: {
            text: text("Text", "No Messages!"),
            textColor: text("Text Color", "blue"),
          },
          widgetBackground: {
            topColor: text("Top Colors", "red"),
            bottomColor: text("Bottom Colors", "blue"),
          },
          icons: {
            bell: text("Bell Icon", ""),
            message: text("Message Icon", ""),
          },
        },
      }}
    >
      <Inbox />
      <UseInbox />
    </CourierProvider>
  );
}

export function MultipleInbox(): React.ReactElement {
  return (
    <CourierProvider
      wsOptions={{
        url: process.env.WS_URL,
      }}
      apiUrl={API_URL}
      clientKey={CLIENT_KEY}
      userId={USER_ID}
    >
      <Toast />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Inbox />
        <UseInbox />
        <CourierProvider
          wsOptions={{
            url: process.env.WS_URL,
          }}
          apiUrl={API_URL}
          clientKey={CLIENT_KEY}
          userId={USER_ID}
        >
          <Inbox
            brand={{
              colors: {
                primary: "red",
                secondary: "pink",
                tertiary: "orange",
              },
            }}
          />
        </CourierProvider>
      </div>
    </CourierProvider>
  );
}

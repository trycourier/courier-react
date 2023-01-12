import React, { useEffect } from "react";
import { useInbox } from "@trycourier/react-hooks";
import { Inbox } from "@trycourier/react-inbox";
import { UnsubscribePage } from "@trycourier/react-preferences";
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

  if (action.type === "inbox/SET_UNREAD_MESSAGE_COUNT") {
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
      // authorization="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6InVzZXJfaWQ6Y2hyaXN0aWFnIiwidGVuYW50X3Njb3BlIjoicHVibGlzaGVkL3Byb2R1Y3Rpb24iLCJ0ZW5hbnRfaWQiOiI1MGQ5YzhlZi0yNjkxLTRmNjQtYjU5OC1kNWYyY2YwNjIzNDIiLCJpYXQiOjE2NzI3NzM1MzIsImp0aSI6IjVjMjAyNGEwLWY5M2YtNDQyMi05ZWFjLWZiYTNkNDBjZjVjNSJ9.LC4Y2YOFXj_QkrPbTq0fJJTyrec599ZP-0204Mx6RkE"
    >
      <UnsubscribePage
        preferencePageUrl="https://google.com"
        topicId="PVJC1C5K5XM12ZJKX9AQ14S45T4W"
      />
    </CourierProvider>
  );
}

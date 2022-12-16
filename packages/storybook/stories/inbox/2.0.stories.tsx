import React from "react";
import ReactMarkdown from "react-markdown";

import { CourierProvider } from "@trycourier/react-provider";
import { Inbox } from "@trycourier/react-inbox";

import mockMiddleware from "./mock-middleware";

const API_URL = process.env.API_URL || "";
const CLIENT_KEY = process.env.CLIENT_KEY || "";
const USER_ID = process.env.USER_ID || "";

export default {
  title: "Inbox Redesign",
};

const mockMessages = [
  {
    body: "This Message is Unread",
    created: "2021-04-06T18:02:28.065Z",
    messageId: 123,
    read: false,
    title: "Unread Message",
    trackingIds: {
      archiveTrackingId: 123,
      readTrackingId: 123,
      unreadTrackingId: 123,
    },
  },
  {
    body: "This Message is Read",
    created: "2021-04-06T18:02:28.065Z",
    messageId: 456,
    read: true,
    title: "Read Message",
    trackingIds: {
      archiveTrackingId: 123,
      readTrackingId: 123,
      unreadTrackingId: 123,
    },
  },
  {
    body: "This Message is Read",
    created: "2021-04-06T18:02:28.065Z",
    messageId: 457,
    read: true,
    title: "Read Message",
    trackingIds: {
      archiveTrackingId: 123,
      readTrackingId: 123,
      unreadTrackingId: 123,
    },
  },
  {
    body: "This Message is Read",
    created: "2021-04-06T18:02:28.065Z",
    messageId: 458,
    read: true,
    title: "Read Message",
    trackingIds: {
      archiveTrackingId: 123,
      readTrackingId: 123,
      unreadTrackingId: 123,
    },
  },
  {
    body: "This Message is Read",
    created: "2021-04-06T18:02:28.065Z",
    messageId: 459,
    read: true,
    icon: false,
    title: "Read Message",
    trackingIds: {
      archiveTrackingId: 123,
      readTrackingId: 123,
      unreadTrackingId: 123,
    },
  },
  {
    body: "This Message is Read",
    created: "2021-04-06T18:02:28.065Z",
    messageId: 4510,
    read: true,
    title: "Read Message",
    trackingIds: {
      archiveTrackingId: 123,
      readTrackingId: 123,
      unreadTrackingId: 123,
    },
  },
];

export const Version2 = () => {
  return (
    <>
      <ReactMarkdown>{"TODO"}</ReactMarkdown>
      <div
        style={{
          display: "flex",
          alignItems: "top",
          justifyContent: "space-between",
        }}
      >
        <div>
          <ReactMarkdown>{`## Example`}</ReactMarkdown>
          <ReactMarkdown>{`\`\`\`javascript\n<Inbox theme={{
  name: "2.0",
}} />\n\`\`\``}</ReactMarkdown>
        </div>
        <CourierProvider
          middleware={[mockMiddleware]}
          wsOptions={{
            url: process.env.WS_URL,
          }}
          apiUrl={API_URL}
          clientKey={CLIENT_KEY}
          userId={USER_ID}
        >
          <Inbox
            isOpen={true}
            theme={{
              name: "2.0",
            }}
          />
        </CourierProvider>
      </div>
    </>
  );
};

export const Loading = () => {
  return (
    <>
      <ReactMarkdown>{"TODO"}</ReactMarkdown>
      <div
        style={{
          display: "flex",
          alignItems: "top",
          justifyContent: "space-between",
        }}
      >
        <div>
          <ReactMarkdown>{`## Example`}</ReactMarkdown>
          <ReactMarkdown>{`\`\`\`javascript\n<Inbox theme={{
  name: "2.0",
}} />\n\`\`\``}</ReactMarkdown>
        </div>
        <CourierProvider
          middleware={[
            () => (next) => (action) => {
              if (action.type === "inbox/INIT") {
                next({
                  ...action,
                  payload: {
                    ...action.payload,
                    isLoading: true,
                  },
                });
                return;
              }
            },
          ]}
          wsOptions={{
            url: process.env.WS_URL,
          }}
          apiUrl={API_URL}
          clientKey={CLIENT_KEY}
          userId={USER_ID}
        >
          <Inbox
            isOpen={true}
            theme={{
              name: "2.0",
            }}
            brand={{
              colors: {
                primary: "#FF93CD",
              },
            }}
          />
        </CourierProvider>
      </div>
    </>
  );
};

export const LoadingMore = () => {
  return (
    <>
      <ReactMarkdown>{"TODO"}</ReactMarkdown>
      <div
        style={{
          display: "flex",
          alignItems: "top",
          justifyContent: "space-between",
        }}
      >
        <div>
          <ReactMarkdown>{`## Example`}</ReactMarkdown>
          <ReactMarkdown>{`\`\`\`javascript\n<Inbox theme={{
  name: "2.0",
}} />\n\`\`\``}</ReactMarkdown>
        </div>
        <CourierProvider
          middleware={[
            () => (next) => (action) => {
              if (action.type === "inbox/INIT") {
                next({
                  ...action,
                  payload: {
                    ...action.payload,
                    isLoading: true,
                    messages: mockMessages.slice(0, 2),
                  },
                });
                return;
              }
            },
          ]}
          wsOptions={{
            url: process.env.WS_URL,
          }}
          apiUrl={API_URL}
          clientKey={CLIENT_KEY}
          userId={USER_ID}
        >
          <Inbox
            isOpen={true}
            theme={{
              name: "2.0",
            }}
            brand={{
              colors: {
                primary: "#FF93CD",
              },
            }}
          />
        </CourierProvider>
      </div>
    </>
  );
};

export const PaginationEnd = () => {
  return (
    <>
      <ReactMarkdown>{"TODO"}</ReactMarkdown>
      <div
        style={{
          display: "flex",
          alignItems: "top",
          justifyContent: "space-between",
        }}
      >
        <div>
          <ReactMarkdown>{`## Example`}</ReactMarkdown>
          <ReactMarkdown>{`\`\`\`javascript\n<Inbox theme={{
  name: "2.0",
}} />\n\`\`\``}</ReactMarkdown>
        </div>
        <CourierProvider
          middleware={[
            () => (next) => (action) => {
              if (action.type === "inbox/INIT") {
                next({
                  ...action,
                  payload: {
                    ...action.payload,
                    isLoading: false,
                    messages: mockMessages,
                  },
                });
                return;
              }
            },
          ]}
          wsOptions={{
            url: process.env.WS_URL,
          }}
          apiUrl={API_URL}
          clientKey={CLIENT_KEY}
          userId={USER_ID}
        >
          <Inbox
            isOpen={true}
            theme={{
              name: "2.0",
            }}
            brand={{
              colors: {
                primary: "#FF93CD",
              },
            }}
          />
        </CourierProvider>
      </div>
    </>
  );
};

export const NoCourierFooter = () => {
  return (
    <>
      <ReactMarkdown>{"TODO"}</ReactMarkdown>
      <div
        style={{
          display: "flex",
          alignItems: "top",
          justifyContent: "space-between",
        }}
      >
        <div>
          <ReactMarkdown>{`## Example`}</ReactMarkdown>
          <ReactMarkdown>{`\`\`\`javascript\n<Inbox theme={{
  name: "2.0",
}} />\n\`\`\``}</ReactMarkdown>
        </div>
        <CourierProvider
          middleware={[
            () => (next) => (action) => {
              if (action.type === "inbox/INIT") {
                next({
                  ...action,
                  payload: {
                    ...action.payload,
                    isLoading: false,
                    messages: mockMessages,
                  },
                });
                return;
              }
            },
          ]}
          wsOptions={{
            url: process.env.WS_URL,
          }}
          apiUrl={API_URL}
          clientKey={CLIENT_KEY}
          userId={USER_ID}
        >
          <Inbox
            isOpen={true}
            theme={{
              name: "2.0",
            }}
            brand={{
              colors: {
                primary: "#FF93CD",
              },
              inapp: {
                disableCourierFooter: true,
              },
            }}
          />
        </CourierProvider>
      </div>
    </>
  );
};

export const NoMessages = () => {
  return (
    <>
      <ReactMarkdown>{"TODO"}</ReactMarkdown>
      <div
        style={{
          display: "flex",
          alignItems: "top",
          justifyContent: "space-between",
        }}
      >
        <div>
          <ReactMarkdown>{`## Example`}</ReactMarkdown>
          <ReactMarkdown>{`\`\`\`javascript\n<Inbox theme={{
  name: "2.0",
}} />\n\`\`\``}</ReactMarkdown>
        </div>
        <CourierProvider
          middleware={[
            () => (next) => (action) => {
              if (action.type === "inbox/INIT") {
                next({
                  ...action,
                  payload: {
                    ...action.payload,
                    isLoading: false,
                    messages: [],
                  },
                });
                return;
              }
            },
          ]}
          wsOptions={{
            url: process.env.WS_URL,
          }}
          apiUrl={API_URL}
          clientKey={CLIENT_KEY}
          userId={USER_ID}
        >
          <Inbox
            isOpen={true}
            theme={{
              name: "2.0",
            }}
            brand={{
              colors: {
                primary: "#FF93CD",
              },
            }}
          />
        </CourierProvider>
      </div>
    </>
  );
};

export const WithPreferences = () => {
  return (
    <>
      <ReactMarkdown>{"TODO"}</ReactMarkdown>
      <div
        style={{
          display: "flex",
          alignItems: "top",
          justifyContent: "space-between",
        }}
      >
        <div>
          <ReactMarkdown>{`## Example`}</ReactMarkdown>
          <ReactMarkdown>{`\`\`\`javascript\n<Inbox theme={{
  name: "2.0",
}} />\n\`\`\``}</ReactMarkdown>
        </div>
        <CourierProvider
          middleware={[
            () => (next) => (action) => {
              if (action.type === "inbox/FETCH_UNREAD_MESSAGE_COUNT/DONE") {
                next({
                  type: "inbox/FETCH_UNREAD_MESSAGE_COUNT/DONE",
                  payload: 1,
                });
                return;
              }

              if (action.type === "inbox/INIT") {
                next({
                  ...action,
                  payload: {
                    ...action.payload,
                    isLoading: false,
                    messages: mockMessages,
                  },
                });

                next({
                  type: "root/GET_BRAND/DONE",
                  payload: {
                    colors: {
                      primary: "#FF93CD",
                      secondary: "#C1B6DD",
                      tertiary: "#E85178",
                    },
                    preferenceTemplates: [{}],
                  },
                });
                return;
              }
            },
          ]}
          wsOptions={{
            url: process.env.WS_URL,
          }}
          apiUrl={API_URL}
          clientKey={CLIENT_KEY}
          userId={USER_ID}
        >
          <Inbox
            isOpen={true}
            theme={{
              name: "2.0",
            }}
            brand={{
              colors: {
                primary: "#FF93CD",
              },
            }}
          />
        </CourierProvider>
      </div>
    </>
  );
};

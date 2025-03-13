import React from "react";
import ReactMarkdown from "react-markdown";

import { CourierProvider } from "@trycourier/react-provider";
import { Inbox } from "@trycourier/react-inbox";
import rehypeRaw from "rehype-raw";

import customComponentsString from "!raw-loader!./custom-components.tsx";
import customHeaderString from "!raw-loader!./custom-header.tsx";
import readmeMd from "@trycourier/react-inbox/README.md";

import {
  CustomBell,
  CustomHeader,
  CustomContainer,
  CustomFooter,
  CustomIcon,
  CustomTabs,
  CustomNoMessages,
} from "./custom-components";

import customHeaderProps from "./custom-header";

// @ts-ignore
import mockMiddleware from "./mock-middleware";
import { mockMessages } from "./2.0.stories";

const API_URL = process.env.API_URL || "";
const CLIENT_KEY = process.env.CLIENT_KEY || "";
const USER_ID = process.env.USER_ID || "";

export default {
  title: "Inbox",
};

export const ReadMe = () => {
  return <ReactMarkdown rehypePlugins={[rehypeRaw]}>{readmeMd}</ReactMarkdown>;
};

export const ThemeExample = () => {
  const theme = {
    container: {
      background: "green",
      padding: "10px",
    },
    header: {
      background: "pink",
    },
    footer: {
      background: "pink",
    },
    messageList: {
      container: {
        background: "pink",
      },
    },
    tabList: {
      tab: {
        color: "white",
        background: "blue",

        "&.active": {
          color: "red",
          borderBottom: "2px dashed red",
        },
      },
    },
  };

  const props = {
    title: "Custom Title",
    showUnreadMessageCount: true,
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "top",
        justifyContent: "space-between",
      }}
    >
      <div>
        <ReactMarkdown>{`## Example`}</ReactMarkdown>
        <ReactMarkdown>{`\`\`\`javascript\nconst props = ${JSON.stringify(
          props,
          null,
          2
        )}\n\`\`\``}</ReactMarkdown>
        <ReactMarkdown>{`\`\`\`javascript\nconst theme = ${JSON.stringify(
          theme,
          null,
          2
        )}\n\`\`\``}</ReactMarkdown>
      </div>
      <CourierProvider
        applyMiddleware={(defaultMiddleware) => [
          mockMiddleware,
          ...defaultMiddleware,
        ]}
        clientKey="Y2U3OWI3NGEtY2FhZC00NTFjLTliZDMtMGZkOTVhMmQ0ZWE4"
        userId="Google_108669107033656954156"
      >
        <Inbox theme={theme} {...props} />
      </CourierProvider>
    </div>
  );
};

export const RenderPropsExample = () => {
  const props = {
    isOpen: true,
    title: "Custom Title",
    renderBell: CustomBell,
    renderContainer: CustomContainer,
    renderHeader: CustomHeader,
    renderFooter: CustomFooter,
    renderIcon: CustomIcon,
    renderTabs: CustomTabs,
    renderNoMessages: CustomNoMessages,
    theme: {
      root: {
        "*": {
          color: "red",
        },
        width: 300,
        padding: 10,
        background: "#ccc",
        borderRadius: 0,
      },
    },
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "top",
        justifyContent: "space-between",
      }}
    >
      <div>
        <ReactMarkdown>{`## Example`}</ReactMarkdown>
        <ReactMarkdown>{`\`\`\`javascript\n${customComponentsString}\n\`\`\``}</ReactMarkdown>
        <ReactMarkdown>{`\`\`\`javascript\nconst props = ${JSON.stringify(
          props,
          null,
          2
        )}\n\`\`\``}</ReactMarkdown>
      </div>
      <CourierProvider clientKey={CLIENT_KEY}>
        <Inbox {...props} />
      </CourierProvider>
    </div>
  );
};

export const RenderPropsExample2 = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "top",
        justifyContent: "space-between",
      }}
    >
      <div>
        <ReactMarkdown>{`## Example`}</ReactMarkdown>
        <ReactMarkdown>{`\`\`\`javascript\n${customHeaderString}\n\`\`\``}</ReactMarkdown>
        <ReactMarkdown>{`\`\`\`javascript\nconst props = ${JSON.stringify(
          customHeaderProps,
          null,
          2
        )}\n\`\`\``}</ReactMarkdown>
      </div>
      <CourierProvider clientKey={CLIENT_KEY}>
        <Inbox {...customHeaderProps} />
      </CourierProvider>
    </div>
  );
};

export const RenderPropsLoadingMore = () => {
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
          applyMiddleware={(defaultMiddleware) => [
            ...defaultMiddleware,
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
            renderLoadingMore={() => <div>Loading more...</div>}
            isOpen={true}
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

export const CustomLabels = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "top",
          justifyContent: "space-between",
        }}
      >
        <div>
          <ReactMarkdown>{`## Example`}</ReactMarkdown>
          <ReactMarkdown>{`\`\`\`javascript\n<Inbox labels={{
  markAsRead: "markey read pwease",
  markAsUnread: "jk, unread me",
  backToInbox: "back it up!",
  markAllAsRead: "mark em all captn",
  closeInbox: "close me plz",
  archiveMessage: "delete yo",
  scrollTop: "scrollz",
  emptyState: "nah dawg",
}} />\n\`\`\``}</ReactMarkdown>
        </div>
        <CourierProvider
          applyMiddleware={(defaultMiddleware) => [
            mockMiddleware,
            ...defaultMiddleware,
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
            formatDate={(date) => String(date)}
            labels={{
              markAsRead: "markey read pwease",
              markAsUnread: "jk, unread me",
              backToInbox: "back it up!",
              markAllAsRead: "mark em all captn",
              closeInbox: "close me plz",
              archiveMessage: "delete yo",
              scrollTop: "scrollz",
              emptyState: "nah dawg",
            }}
          />
        </CourierProvider>
      </div>
    </>
  );
};

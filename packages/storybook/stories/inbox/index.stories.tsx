import React from "react";
import ReactMarkdown from "react-markdown";
import propsMd from "@trycourier/react-inbox/docs/0.props.md";
import themeMd from "@trycourier/react-inbox/docs/1.theme.md";
import renderPropsMd from "@trycourier/react-inbox/docs/2.render-props.md";
import hooksMd from "@trycourier/react-inbox/docs/3.hooks.md";

import { CourierProvider } from "@trycourier/react-provider";
import { Inbox } from "@trycourier/react-inbox";

import customComponentsString from "!raw-loader!./custom-components.tsx";
import {
  CustomBell,
  CustomHeader,
  CustomContainer,
  CustomFooter,
  CustomIcon,
  CustomTabs,
  CustomNoMessages,
} from "./custom-components.tsx";

import myCustomInboxString from "!raw-loader!./hooks.tsx";
import { MyCustomInbox } from "./hooks";
import mockMiddleware from "./mock-middleware";

const API_URL = process.env.API_URL || "";
const CLIENT_KEY = process.env.CLIENT_KEY || "";
const USER_ID = process.env.USER_ID || "";
const WS_URL = process.env.WS_URL || "";

export default {
  title: "Inbox",
};

export const Props = () => {
  return <ReactMarkdown>{propsMd}</ReactMarkdown>;
};

export const Theme = () => {
  return <ReactMarkdown>{themeMd}</ReactMarkdown>;
};

export const ThemeExample = () => {
  const theme = {
    container: {
      background: "green",
    },
    header: {
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
        clientKey="Y2U3OWI3NGEtY2FhZC00NTFjLTliZDMtMGZkOTVhMmQ0ZWE4"
        userId="Google_108669107033656954156"
      >
        <Inbox theme={theme} {...props} />
      </CourierProvider>
    </div>
  );
};

export const RenderProps = () => {
  return <ReactMarkdown>{renderPropsMd}</ReactMarkdown>;
};

export const RenderPropsExammple = () => {
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
      <CourierProvider>
        <Inbox {...props} />
      </CourierProvider>
    </div>
  );
};

export const Hooks = () => {
  return (
    <>
      <ReactMarkdown>{hooksMd}</ReactMarkdown>
      <div
        style={{
          display: "flex",
          alignItems: "top",
          justifyContent: "space-between",
        }}
      >
        <div>
          <ReactMarkdown>{`## Example`}</ReactMarkdown>
          <ReactMarkdown>{`\`\`\`javascript\n${myCustomInboxString}\n\`\`\``}</ReactMarkdown>
        </div>
        <CourierProvider
          middleware={[mockMiddleware]}
          wsUrl={WS_URL}
          apiUrl={API_URL}
          clientKey={CLIENT_KEY}
          userId={USER_ID}
        >
          <MyCustomInbox />
        </CourierProvider>
      </div>
    </>
  );
};

export const CustomLabels = () => {
  return (
    <>
      <ReactMarkdown>{hooksMd}</ReactMarkdown>
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
          }} />\n\`\`\``}</ReactMarkdown>
        </div>
        <CourierProvider
          middleware={[mockMiddleware]}
          wsUrl={WS_URL}
          apiUrl={API_URL}
          clientKey={CLIENT_KEY}
          userId={USER_ID}
        >
          <Inbox
            isOpen={true}
            labels={{
              markAsRead: "markey read pwease",
              markAsUnread: "jk, unread me",
              backToInbox: "back it up!",
              markAllAsRead: "mark em all captn",
            }}
          />
        </CourierProvider>
      </div>
    </>
  );
};

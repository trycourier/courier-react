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
  CustomHeader,
  CustomContainer,
  CustomFooter,
  CustomIcon,
  CustomTabs,
  CustomNoMessages,
} from "./custom-components.tsx";

import myCustomInboxString from "!raw-loader!./hooks.tsx";
import { MyCustomInbox } from "./hooks";

export default {
  title: "Inbox",
};

export const Props = () => {
  return <ReactMarkdown>{propsMd}</ReactMarkdown>;
};

export const Theme = () => {
  return <ReactMarkdown>{themeMd}</ReactMarkdown>;
};

export const ThemeExammple = () => {
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
    isOpen: true,
    title: "Custom Title",
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
      <CourierProvider>
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

const API_URL = process.env.API_URL || "";
const CLIENT_KEY = process.env.CLIENT_KEY || "";
const USER_ID = process.env.USER_ID || "";
const WS_URL = process.env.WS_URL || "";

const middleware = () => (next) => (action) => {
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

  if (action.type === "inbox/SET_UNREAD_MESSAGE_COUNT") {
    next({
      type: action.type + "/DONE",
      payload: 2,
    });
    return;
  }

  if (action.type === "inbox/FETCH_MESSAGES") {
    next({
      type: action.type + "/PENDING",
    });

    setTimeout(() => {
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
              },
            },
            {
              messageId: 456,
              created: "2021-04-06T18:02:28.065Z",
              read: true,
              content: {
                title: "Read Message",
                body: "This Message is Read",
              },
            },
          ],
        },
      });
    }, 1000);

    return;
  }
  next(action);
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
          middleware={[middleware]}
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

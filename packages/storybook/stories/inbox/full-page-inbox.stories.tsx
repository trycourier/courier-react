import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";

import { CourierProvider } from "@trycourier/react-provider";

import fullPageInboxHooksString from "!raw-loader!./full-page-inbox-hooks.tsx";
import { FullPageInboxHooks } from "./full-page-inbox-hooks";
import Frame from "react-frame-component";
import { useElementalInbox } from "@trycourier/react-hooks";

export default {
  title: "Full Page Inbox",
};

const FramedInBbox = () => {
  const { getUnreadMessageCount, unreadMessageCount } = useElementalInbox();

  useEffect(() => {
    getUnreadMessageCount();
  }, []);

  return <div>Unread: {unreadMessageCount}</div>;
};

export const Hooks = () => {
  const courierProps = {
    wsOptions: {
      url: "wss://icnrz8ttcf.execute-api.us-east-1.amazonaws.com/staging",
    },
    apiUrl: "https://4rq7n8hhjd.execute-api.us-east-1.amazonaws.com/staging/q",
    clientKey: "YWZiZWViNGItMjAyMS00MzgwLTlkZDUtZWI0Y2MzNzEwNmMw",
    userId: "riley",
  };
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
          <ReactMarkdown>{`\`\`\`javascript\n${fullPageInboxHooksString}\n\`\`\``}</ReactMarkdown>
        </div>
        <CourierProvider {...courierProps}>
          <FullPageInboxHooks />
        </CourierProvider>
        <Frame>
          <CourierProvider {...courierProps}>
            <FramedInBbox />
          </CourierProvider>
        </Frame>
      </div>
    </>
  );
};

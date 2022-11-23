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
  const stagingCourierProps = {
    wsOptions: {
      url: "wss://icnrz8ttcf.execute-api.us-east-1.amazonaws.com/staging",
    },
    apiUrl: "https://4rq7n8hhjd.execute-api.us-east-1.amazonaws.com/staging/q",
    clientKey: "YWZiZWViNGItMjAyMS00MzgwLTlkZDUtZWI0Y2MzNzEwNmMw",
    userId: "riley",
  };

  const devCourierProops = {
    apiUrl: "https://3rjq5oe9b1.execute-api.us-east-1.amazonaws.com/dev/q",
    wsOptions: {
      url: "wss://20en15n3ng.execute-api.us-east-1.amazonaws.com/dev",
    },
    clientKey: "NzY4MjUxY2YtM2ViOC00MjZhLTkyZWItZmFhMGU3Njc4NzY4",
    userId: "70f6a4f4-2907-4518-b8f3-b9cfab224764",
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
        <CourierProvider {...devCourierProops}>
          <FullPageInboxHooks />
        </CourierProvider>
        <Frame>
          <CourierProvider id="iframe" {...devCourierProops}>
            <FramedInBbox />
          </CourierProvider>
        </Frame>
      </div>
    </>
  );
};

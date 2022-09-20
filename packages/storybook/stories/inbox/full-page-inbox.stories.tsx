import React from "react";
import ReactMarkdown from "react-markdown";

import { CourierProvider } from "@trycourier/react-provider";

import fullPageInboxHooksString from "!raw-loader!./full-page-inbox-hooks.tsx";
import { FullPageInboxHooks } from "./full-page-inbox-hooks";

export default {
  title: "Full Page Inbox",
};

export const Hooks = () => {
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
        <CourierProvider
          wsOptions={{
            url: "wss://icnrz8ttcf.execute-api.us-east-1.amazonaws.com/staging",
          }}
          apiUrl={
            "https://4rq7n8hhjd.execute-api.us-east-1.amazonaws.com/staging/q"
          }
          clientKey={"YWZiZWViNGItMjAyMS00MzgwLTlkZDUtZWI0Y2MzNzEwNmMw"}
          userId={"riley"}
        >
          <FullPageInboxHooks />
        </CourierProvider>
      </div>
    </>
  );
};

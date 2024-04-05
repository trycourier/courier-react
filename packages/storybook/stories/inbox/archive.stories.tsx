import React from "react";
import ReactMarkdown from "react-markdown";

import { Inbox } from "@trycourier/react-inbox";
import { CourierProvider } from "@trycourier/react-provider";
import rehypeRaw from "rehype-raw";

import readmeMd from "@trycourier/react-inbox/README.md";

// @ts-ignore

const API_URL = process.env.API_URL || "";
const CLIENT_KEY = process.env.CLIENT_KEY || "";
const USER_ID = process.env.USER_ID || "";

export default {
  title: "Inbox",
};

export const ReadMe = () => {
  return <ReactMarkdown rehypePlugins={[rehypeRaw]}>{readmeMd}</ReactMarkdown>;
};

export const ArchivedExample = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "top",
        justifyContent: "space-between",
      }}
    >
      <div>
        <ReactMarkdown>{`## Archived Example`}</ReactMarkdown>
        <ReactMarkdown>{`
\`\`\`
<Inbox
  views={[
    { label: "Notifications", id: "messages" },
    { label: "Archived", params: { archived: true }, id: "archived" },
  ]}
/>
\`\`\``}</ReactMarkdown>
      </div>
      <div>
        <CourierProvider
          // applyMiddleware={(defaultMiddleware) => [
          //   mockMiddleware,
          //   ...defaultMiddleware,
          // ]}
          clientKey={CLIENT_KEY}
          userId={USER_ID}
        >
          <Inbox
            views={[
              { label: "Notifications", id: "messages" },
              { label: "Archived", params: { archived: true }, id: "archived" },
            ]}
          />
        </CourierProvider>
      </div>
    </div>
  );
};

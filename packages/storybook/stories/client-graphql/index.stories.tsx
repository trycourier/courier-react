import React from "react";
import ReactMarkdown from "react-markdown";

const userId = process.env.USER_ID ?? "";
const clientKey = process.env.CLIENT_KEY ?? "";

export default {
  title: "GraphQL/Inbox",
};

import countExampleString from "!raw-loader!./examples/count.tsx";
import CountExample from "./examples/count";

export const Count = () => (
  <>
    <ReactMarkdown>{`\`\`\`javascript\n${countExampleString}\n\`\`\``}</ReactMarkdown>
    <CountExample userId={userId} clientKey={clientKey} />
  </>
);

import messagesExampleString from "!raw-loader!./examples/messages.tsx";
import MessagesExample from "./examples/messages";

export const Messages = () => (
  <>
    <ReactMarkdown>{`\`\`\`javascript\n${messagesExampleString}\n\`\`\``}</ReactMarkdown>
    <MessagesExample userId={userId} clientKey={clientKey} />
  </>
);

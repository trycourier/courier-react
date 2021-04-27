import React from "react";
import ReactMarkdown from "react-markdown";
import readme from "@trycourier/react-inbox/README.md";

export default {
  title: "Inbox",
};

export const GettingStarted = () => {
  return <ReactMarkdown>{readme}</ReactMarkdown>;
};

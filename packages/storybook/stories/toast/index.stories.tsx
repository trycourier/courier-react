import React from "react";
import ReactMarkdown from "react-markdown";
import readme from "@trycourier/react-toast/README.md";

export default {
  title: "Toast/Es",
};

export const GettingStarted = () => {
  return <ReactMarkdown>{readme}</ReactMarkdown>;
};

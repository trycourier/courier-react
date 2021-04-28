import React from "react";
import ReactMarkdown from "react-markdown";
import overview from "@trycourier/react-inbox/docs/1.overview.md";
import installation from "@trycourier/react-inbox/docs/2.installation.md";
import props from "@trycourier/react-inbox/docs/3.props.md";

export default {
  title: "Inbox",
};

export const GettingStarted = () => {
  return <ReactMarkdown>{overview}</ReactMarkdown>;
};

export const Installation = () => {
  return <ReactMarkdown>{installation}</ReactMarkdown>;
};

export const Props = () => {
  return <ReactMarkdown>{props}</ReactMarkdown>;
};

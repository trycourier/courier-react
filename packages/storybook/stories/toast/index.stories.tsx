import React from "react";
import ReactMarkdown from "react-markdown";
import overview from "@trycourier/react-toast/docs/1.overview.md";
import installation from "@trycourier/react-toast/docs/2.installation.md";
import props from "@trycourier/react-toast/docs/3.props.md";
import hooks from "@trycourier/react-toast/docs/4.hooks.md";

export default {
  title: "Toast",
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

export const Hooks = () => {
  return <ReactMarkdown>{hooks}</ReactMarkdown>;
};

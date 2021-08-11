import React from "react";
import ReactMarkdown from "react-markdown";
import propsMd from "@trycourier/react-provider/docs/0.props.md";
import listentingToMessagesMd from "@trycourier/react-provider/docs/1.listening-to-messages.md";

export default {
  title: "Provider",
};

export const Props = () => {
  return <ReactMarkdown>{propsMd}</ReactMarkdown>;
};

export const ListentingToMessages = () => {
  return <ReactMarkdown>{listentingToMessagesMd}</ReactMarkdown>;
};

import React from "react";
import ReactMarkdown from "react-markdown";
import titleMd from "@trycourier/react-elements/docs/title.md";

export default {
  title: "Elements/Title",
};

export const Title = () => <ReactMarkdown>{titleMd}</ReactMarkdown>;

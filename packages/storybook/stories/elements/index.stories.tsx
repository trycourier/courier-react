import React from "react";
import ReactMarkdown from "react-markdown";
import overviewMd from "@trycourier/react-elements/docs/0.overview.md";

export default {
  title: "Elements",
};

export const Elements = () => <ReactMarkdown>{overviewMd}</ReactMarkdown>;

import authentication from "./docs/authentication.md";
import gettingStarted from "./docs/getting-started.md";
import introduction from "./docs/introduction.md";
import React from "react";
import reactIntegration from "./docs/react-integration.md";
import ReactMarkdown from "react-markdown";
import testingTheIntegration from "./docs/testing-the-integration.md";
import troubleshooting from "./docs/troubleshooting.md";

import embeddedIntegration from "@trycourier/components/README.md";

export default {
  title: "Introduction",
  argTypes: {},
  args: {},
};

export const Introduction = () => {
  return <ReactMarkdown>{introduction}</ReactMarkdown>;
};

export const GettingStarted = () => {
  return <ReactMarkdown>{gettingStarted}</ReactMarkdown>;
};

export const Authentication = () => {
  return <ReactMarkdown>{authentication}</ReactMarkdown>;
};

export const ReactIntegration = () => {
  return <ReactMarkdown>{reactIntegration}</ReactMarkdown>;
};

export const EmbeddedIntegration = () => {
  return <ReactMarkdown>{embeddedIntegration}</ReactMarkdown>;
};

export const TestingTheIntegration = () => {
  return <ReactMarkdown>{testingTheIntegration}</ReactMarkdown>;
};

export const Troubleshooting = () => {
  return <ReactMarkdown>{troubleshooting}</ReactMarkdown>;
};

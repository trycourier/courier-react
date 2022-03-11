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

export const Introduction = (): React.ReactElement => {
  return <ReactMarkdown>{introduction}</ReactMarkdown>;
};

export const GettingStarted = (): React.ReactElement => {
  return <ReactMarkdown>{gettingStarted}</ReactMarkdown>;
};

export const Authentication = (): React.ReactElement => {
  return <ReactMarkdown>{authentication}</ReactMarkdown>;
};

export const ReactIntegration = (): React.ReactElement => {
  return <ReactMarkdown>{reactIntegration}</ReactMarkdown>;
};

export const EmbeddedIntegration = (): React.ReactElement => {
  return <ReactMarkdown>{embeddedIntegration}</ReactMarkdown>;
};

export const TestingTheIntegration = (): React.ReactElement => {
  return <ReactMarkdown>{testingTheIntegration}</ReactMarkdown>;
};

export const Troubleshooting = (): React.ReactElement => {
  return <ReactMarkdown>{troubleshooting}</ReactMarkdown>;
};

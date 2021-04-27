import React from "react";
import ReactMarkdown from "react-markdown";
import introduction from "./docs/introduction.md";
import gettingStarted from "./docs/getting-started.md";
import reactIntegration from "./docs/react-integration.md";
import testingTheIntegration from "./docs/testing-the-integration.md";
import troubleshooting from "./docs/troubleshooting.md";

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

export const ReactIntegration = () => {
  return <ReactMarkdown>{reactIntegration}</ReactMarkdown>;
};

export const TestingTheIntegration = () => {
  return <ReactMarkdown>{testingTheIntegration}</ReactMarkdown>;
};

export const Troubleshooting = () => {
  return <ReactMarkdown>{troubleshooting}</ReactMarkdown>;
};

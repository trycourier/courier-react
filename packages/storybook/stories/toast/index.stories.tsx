import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import overviewMd from "@trycourier/react-toast/docs/1.overview.md";
import installationMd from "@trycourier/react-toast/docs/2.installation.md";
import propsMd from "@trycourier/react-toast/docs/3.props.md";
import themeMd from "@trycourier/react-toast/docs/4.theme.md";
import hooksMd from "@trycourier/react-toast/docs/5.hooks.md";

import { CourierProvider } from "@trycourier/react-provider";

import { Toast, useToast, ToastBody } from "@trycourier/react-toast";

import {
  withKnobs,
  text,
  boolean,
  number,
  color,
  select,
} from "@storybook/addon-knobs";

export default {
  title: "Toast",
  decorators: [withKnobs],
};

export const GettingStarted = () => {
  return <ReactMarkdown>{overviewMd}</ReactMarkdown>;
};

export const Installation = () => {
  return <ReactMarkdown>{installationMd}</ReactMarkdown>;
};

const ExampleButton: React.FunctionComponent = () => {
  const [toast] = useToast();

  const handleOnClick = () => {
    toast("Hello World");
  };

  return <button onClick={handleOnClick}>Show Toast</button>;
};

export const Props = () => {
  const hideDefaultIcon = boolean("Hide Default Icon", false);
  const disableAutoClose = boolean("Disable Auto Close", false);
  const autoCloseTimeout = number("Auto Close Timeout", 5000);

  return (
    <CourierProvider>
      <ReactMarkdown>{propsMd}</ReactMarkdown>
      <ReactMarkdown>{`## Examples`}</ReactMarkdown>
      <Toast
        hideProgressBar={boolean("Hide Progress Bar", false)}
        autoClose={disableAutoClose === true ? false : autoCloseTimeout}
        defaultIcon={hideDefaultIcon === true ? false : undefined}
        position={select(
          "Position",
          [
            "top-left",
            "top-center",
            "top-right",
            "bottom-left",
            "bottom-center",
            "bottom-right",
          ],
          "top-right"
        )}
        transition={select("Transition", ["bounce", "slide", "zoom"], "slide")}
      />
      <ExampleButton />
    </CourierProvider>
  );
};

export const Theme = () => {
  const theme = {
    toast: {
      backgroundColor: "black",
      borderRadius: 5,
      height: 40,
      boxShadow: "0px 5px 20px 2px rgba(0,0,0,0.60)",
    },
    message: {
      title: {
        color: "white",
      },
      body: {
        color: "white",
      },
      actions: {
        details: {
          backgroundColor: "black",
          color: "white",
          "&:hover": {
            backgroundColor: "purple",
          },
        },
        dismiss: {
          backgroundColor: "black",
          color: "white",
          "&:hover": {
            backgroundColor: "purple",
          },
        },
      },
    },
  };

  return (
    <>
      <ReactMarkdown>{themeMd}</ReactMarkdown>
      <ReactMarkdown>{`## Examples`}</ReactMarkdown>
      <ReactMarkdown>{`\`\`\`javascript\nconst theme = ${JSON.stringify(
        theme,
        null,
        2
      )}\n\`\`\``}</ReactMarkdown>
      <CourierProvider>
        <ToastBody body="Theme" title="Title" theme={theme} />
      </CourierProvider>
    </>
  );
};

export const Hooks = () => {
  return <ReactMarkdown>{hooksMd}</ReactMarkdown>;
};

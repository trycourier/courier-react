import React from "react";
import ReactMarkdown from "react-markdown";
import propsMd from "@trycourier/react-toast/docs/3.props.md";
import themeMd from "@trycourier/react-toast/docs/4.theme.md";
import hooksMd from "@trycourier/react-toast/docs/5.hooks.md";

import { CourierProvider } from "@trycourier/react-provider";

import { Toast, useToast, ToastBody } from "@trycourier/react-toast";

import {
  withKnobs,
  boolean,
  number,
  select,
  text,
} from "@storybook/addon-knobs";

export default {
  title: "Toast",
  decorators: [withKnobs],
};

const ExampleButton: React.FunctionComponent<{ text?: string }> = ({
  text,
}) => {
  const [toast] = useToast();

  const handleOnClick = () => {
    toast({
      preview: "Hello World",
      title: "foo",
    });
  };

  return <button onClick={handleOnClick}>{text ?? "Show Toast"}</button>;
};

export const Props = () => {
  const hideDefaultIcon = boolean("Hide Default Icon", false);
  const disableAutoClose = boolean("Disable Auto Close", false);
  const autoCloseTimeout = number("Auto Close Timeout", 5000);

  return (
    <CourierProvider clientKey="foobar">
      <ReactMarkdown>{propsMd}</ReactMarkdown>
      <ReactMarkdown>{`## Example`}</ReactMarkdown>
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
      backgroundColor: text("Background Color", "black"),
      borderRadius: number("Border Radius", 5),
      boxShadow: "0px 5px 20px 2px rgba(0,0,0,0.60)",
    },
    dismiss: {
      background: "orange",
    },
    message: {
      title: {
        color: text("Title Color", "white"),
      },
      textBlock: {
        color: text("Body Text Color", "white"),
      },
      actionBlock: {
        backgroundColor: text("Button Background Color", "white"),
        color: text("Button Text Color", "red"),
        "&:hover": {
          backgroundColor: text("Button Hover BG Color", "red"),
        },
      },
    },
  };

  return (
    <>
      <ReactMarkdown>{themeMd}</ReactMarkdown>
      <ReactMarkdown>{`## Example`}</ReactMarkdown>
      <ReactMarkdown>{`\`\`\`javascript\nconst theme = ${JSON.stringify(
        theme,
        null,
        2
      )}\n\`\`\``}</ReactMarkdown>
      <CourierProvider clientKey="foobar">
        <ToastBody message={{} as any} title="Title" theme={theme} />
      </CourierProvider>
    </>
  );
};

export const Hooks = () => {
  return <ReactMarkdown>{hooksMd}</ReactMarkdown>;
};

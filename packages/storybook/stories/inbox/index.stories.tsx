import React from "react";
import ReactMarkdown from "react-markdown";
import propsMd from "@trycourier/react-inbox/docs/0.props.md";
import themeMd from "@trycourier/react-inbox/docs/1.theme.md";
import { CourierProvider } from "@trycourier/react-provider";
import { Inbox } from "@trycourier/react-inbox";

export default {
  title: "Inbox",
};

export const Props = () => {
  return <ReactMarkdown>{propsMd}</ReactMarkdown>;
};

export const Theme = () => {
  return <ReactMarkdown>{themeMd}</ReactMarkdown>;
};

export const Example = () => {
  const theme = {
    container: {
      background: "green",
    },
    header: {
      background: "pink",
    },
    messageList: {
      container: {
        background: "pink",
      },
    },
    tabList: {
      tab: {
        color: "white",
        background: "blue",

        "&.active": {
          color: "red",
          borderBottom: "2px dashed red",
        },
      },
    },
  };

  const props = {
    isOpen: true,
    title: "Custom Title",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "top",
        justifyContent: "space-between",
      }}
    >
      <div>
        <ReactMarkdown>{`## Example`}</ReactMarkdown>
        <ReactMarkdown>{`\`\`\`javascript\nconst props = ${JSON.stringify(
          props,
          null,
          2
        )}\n\`\`\``}</ReactMarkdown>
        <ReactMarkdown>{`\`\`\`javascript\nconst theme = ${JSON.stringify(
          theme,
          null,
          2
        )}\n\`\`\``}</ReactMarkdown>
      </div>
      <CourierProvider>
        <Inbox theme={theme} {...props} />
      </CourierProvider>
    </div>
  );
};

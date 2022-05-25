import React from "react";
import ReactMarkdown from "react-markdown";
import buttonMd from "@trycourier/react-elements/docs/button.md";
import linkButtonMd from "@trycourier/react-elements/docs/link-button.md";
import { Button, LinkButton, Title } from "@trycourier/react-elements";

export default {
  title: "Elements/Buttons",
};

export const Buttons = () => (
  <div>
    <ReactMarkdown>{buttonMd}</ReactMarkdown>

    <Title>Example</Title>
    <Button>Button</Button>

    <ReactMarkdown>{linkButtonMd}</ReactMarkdown>
    <Title>Example</Title>
    <LinkButton>Button</LinkButton>
  </div>
);

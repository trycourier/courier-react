import React from "react";
import ReactMarkdown from "react-markdown";
import iconsMd from "@trycourier/react-elements/docs/icons.md";
import { Title, icons } from "@trycourier/react-elements";

export default {
  title: "Elements/Icons",
};

export const Icons = () => (
  <>
    <ReactMarkdown>{iconsMd}</ReactMarkdown>
    <Title>Example</Title>
    <ReactMarkdown>{'`<icons.Courier size="lg" color="red" />`'}</ReactMarkdown>
    <icons.Courier size="lg" color="red" />
    <ReactMarkdown>{"`<icons.CourierTextLogo size={70} />`"}</ReactMarkdown>
    <icons.CourierTextLogo size={70} />
  </>
);

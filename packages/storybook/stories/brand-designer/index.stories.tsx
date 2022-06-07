import React from "react";
import ReactMarkdown from "react-markdown";
import overviewMd from "@trycourier/react-elements/docs/0.overview.md";
import { BrandDesigner as BrandDesignerComponent } from "@trycourier/react-brand-designer";

export default {
  title: "Brand Designer",
};

export const BrandDesigner = () => (
  <>
    <ReactMarkdown>{overviewMd}</ReactMarkdown>
    <BrandDesignerComponent />
  </>
);
